import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import InputStyles from '../TextField/index.module.css';
import styles from './index.module.css';

interface FileUploadProps {
  onChange: (files: File[]) => void;
  name: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange, name }) => {
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    maxFiles: 10,
    maxSize: 25 * 1024 * 1024,
    multiple: true,
    onDrop: (acceptedFiles) => {
      const totalSize = acceptedFiles.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > 100 * 1024 * 1024) {
        alert('Total file size cannot exceed 100MB');
        return;
      }
      onChange(acceptedFiles);
    }
  });

  return (
    <div className={`${styles['file-upload']} ${styles['file-upload__dropzone']} ${isDragActive ? styles['file-upload__dropzone--dragging'] : ''}`} {...getRootProps()}>
      <input {...getInputProps({ name })} id="upload" type="file" multiple className={InputStyles['input']} aria-invalid="false" aria-required="false" aria-describedby="upload-help upload-error upload-instructions" />
      <p className={styles['file-upload__message']}>Drag file(s) here, or click to select from your device.</p>
      {acceptedFiles.length > 0 && (
        <ul className={styles['file-upload__list']}>
          {acceptedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
