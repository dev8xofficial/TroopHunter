#!/bin/bash

BASE_DIR="./public/videos"

# Find all .mp4 files recursively under BASE_DIR
find "$BASE_DIR" -type f -name "*.mp4" | while IFS= read -r MP4_FILE; do
  # Ensure file exists
  if [ ! -f "$MP4_FILE" ]; then
    echo "⚠️ Skipping missing file: $MP4_FILE"
    continue
  fi

  SUBFOLDER=$(dirname "$MP4_FILE")

  # Skip if master.m3u8 already exists
  if [ -f "$SUBFOLDER/master.m3u8" ]; then
    echo "✅ HLS already exists in: $SUBFOLDER"
    continue
  fi

  echo "🎬 Generating HLS for: $MP4_FILE"

  # Check for audio stream
  HAS_AUDIO=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$MP4_FILE")

  if [ -z "$HAS_AUDIO" ]; then
    echo "🔇 No audio stream detected. Generating video-only HLS."
    AUDIO_MAP_720=""
    AUDIO_MAP_480=""
    AUDIO_MAP_1080=""
    AUDIO_CODEC_720=""
    AUDIO_CODEC_480=""
    AUDIO_CODEC_1080=""
    VAR_STREAM_MAP="v:0 v:1"
  else
    echo "🔊 Audio stream detected. Including audio in HLS."
    AUDIO_MAP_720="-map 0:a?"
    AUDIO_MAP_480="-map 0:a?"
    AUDIO_MAP_1080="-map 0:a?"
    AUDIO_CODEC_720="-c:a:0 aac -b:a:0 128k"
    AUDIO_CODEC_480="-c:a:1 aac -b:a:1 128k"
    AUDIO_CODEC_1080="-c:a:2 aac -b:a:2 128k"
    VAR_STREAM_MAP="v:0,a:0 v:1,a:1"
  fi

  # Detect width safely
  WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width \
          -of default=noprint_wrappers=1:nokey=1 "$MP4_FILE")

  if [ -z "$WIDTH" ]; then
    echo "❌ Could not detect video width for: $MP4_FILE — skipping."
    continue
  fi

  echo "📏 Detected video width: $WIDTH px"

  USE_1080P=false
  if [ "$WIDTH" -ge 1800 ]; then
    USE_1080P=true
    echo "🟢 Including 1080p stream."
    VAR_STREAM_MAP+=" v:2"
    [[ -n "$HAS_AUDIO" ]] && VAR_STREAM_MAP+=",a:2"
  else
    echo "🟡 Skipping 1080p (width < 1800 px)."
  fi

  # Build filter_complex
  if [ "$USE_1080P" = true ]; then
    FILTER_COMPLEX="[0:v]split=3[v1][v2][v3]; \
      [v1]scale=w=1280:h=720[v1out]; \
      [v2]scale=w=854:h=480[v2out]; \
      [v3]scale=w=1920:h=1080[v3out]"
  else
    FILTER_COMPLEX="[0:v]split=2[v1][v2]; \
      [v1]scale=w=1280:h=720[v1out]; \
      [v2]scale=w=854:h=480[v2out]"
  fi

  # Run ffmpeg directly (no eval)
  ffmpeg -nostdin -i "$MP4_FILE" -preset veryfast -g 48 -sc_threshold 0 \
    -filter_complex "$FILTER_COMPLEX" \
    -map "[v1out]" $AUDIO_MAP_720 -c:v:0 libx264 -b:v:0 2800k $AUDIO_CODEC_720 \
    -map "[v2out]" $AUDIO_MAP_480 -c:v:1 libx264 -b:v:1 1400k $AUDIO_CODEC_480 \
    $( [ "$USE_1080P" = true ] && echo "-map [v3out] $AUDIO_MAP_1080 -c:v:2 libx264 -b:v:2 5000k $AUDIO_CODEC_1080" ) \
    -f hls -hls_time 4 -hls_playlist_type vod \
    -master_pl_name master.m3u8 \
    -var_stream_map "$VAR_STREAM_MAP" \
    "$SUBFOLDER/stream_%v.m3u8"

  echo "✅ HLS generated in: $SUBFOLDER"
done
