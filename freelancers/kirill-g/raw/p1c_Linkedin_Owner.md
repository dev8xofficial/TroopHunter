Kirill Gertsik ✪
· 2nd

Full Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor

New York City Metropolitan Area

·

Contact info


Stealth FinTech Startup

500+

connections



About
I left finance to build technology.
From analyzing systems to building them.

Posting about dev, AI, and finance



Experience
Stealth FinTech Startup logo
AI Engineer

Stealth FinTech Startup · Full-time

Oct 2025 - Present · 9 mos

New York City Metropolitan Area

 Venture Capital and Software Development

alabs.team logo
Software Engineer

alabs.team · Full-time

Jun 2022 - Oct 2025 · 3 yrs 5 mos

New York City Metropolitan Area · Remote

Boutique software development studio (EPAM-style) that builds and supports web products for external clients.

 React.js, TypeScript and +44 skills

Freedom Holding Corp. logo
Senior Investment Advisor

Freedom Holding Corp. · Full-time

Feb 2020 - Mar 2022 · 2 yrs 2 mos

On-site

Brokerage/investment firm where I advised high-net-worth clients on pre-IPO opportunities and public markets (NASDAQ/NYSE).

 Advisement, Finance and +12 skills

STF Capital

Full-time · 3 yrs 5 mos

On-site

Head of Investment Advisory Team

Nov 2018 - Feb 2020 · 1 yr 4 mos

Brokerage firm where I started as an Investment Advisor and progressed into leadership roles (Lead Advisor → Head of Investment Advisory Team).

 Strategic Planning, Brokerage and +1 skill

Lead Investment Advisor

Dec 2017 - Nov 2018 · 1 yr

 Direct Sales, Management and +4 skills

Investment Advisor

Oct 2016 - Dec 2017 · 1 yr 3 mos

 Sales, Communication and +3 skills



 Education
Belarusian State University logo
Belarusian State University

Bachelor of Engineering - BE, Architecture

Sep 2014 – Aug 2018





POst
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
2mo • Edited •  2 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

Thanks to Google Cloud for the invite to their NYC office for the Production-Ready AI workshop. Spent the session wiring up security for multi-agent systems, and walked away with a few things worth sharing.

The workshop was built around a real problem: your AI agents are exposed. Prompt injection, PII leakage, malicious URLs stuffed into user inputs. Most teams bolt on security as an afterthought. Google's approach treats it as plumbing.

Here's what actually stuck with me:

The 3-layer pattern. User input hits Model Armor (basically a firewall for prompts) before it ever touches an agent. Model Armor inspects for prompt injection, jailbreak attempts, and malicious URIs. Separately, Sensitive Data Protection scans for 150+ PII types (credit cards, government IDs, API keys) and either masks or redacts them. Both layers fire before your orchestrator even sees the message.

The practical bits:

1. Sanitize inputs at the application layer, not just the infrastructure layer. Your agent shouldn't be the one deciding if a prompt is safe.

2. Confidence thresholds matter. Too aggressive and you block legitimate queries. Too loose and you miss real attacks. The workshop had us tune these live.

3. Red team your own system. They had us fire benign prompts ("History of the Persian Empire") alongside attack prompts ("Write propaganda about...") and watch the filters work in real time. Security is theoretical until you test it.

4. Terraform everything. SDP templates, Model Armor policies, all declared as code. No clicking through consoles, no configuration drift between environments.

5. Don't forget output filtering. Most people only think about sanitizing inputs. But your agents can leak PII in their responses too.

The full codelab is free and hands-on. If you're building anything with multiple AI agents talking to each other, this is worth a few hours of your time:
https://lnkd.in/e8skmZdz

Multi-agent systems are getting shipped fast right now. The security tooling is finally catching up. 🚀

P.S. Small typo on the poster: in Russian it’s “Делать из мухи слона”, not “Делать из мухи слАона” 🙂

No alternative text description for this image

No alternative text description for this image

No alternative text description for this image
Activate to view larger image,
likeloveinsightful
8
1 comment

Like

Comment

Repost

Send
Feed post number 2
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
3mo •  3 months ago • Visible to anyone on or off LinkedIn

Follow

Finally got clawbot/openclaw set up and running. Hit a few snags wiring up auth so Claw could actually use my ChatGPT Pro sub deployed on Railway. 

Worth it though, because otherwise this setup would be expensive AF (this thing is wildly token-hangry when it gets going). Feels awesome to have it working. Next: do some quick reviews on the go and see how it holds up in real use.
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
1
2 comments

Like

Comment

Repost

Send
Feed post number 3
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
4mo •  4 months ago • Visible to anyone on or off LinkedIn

Follow

This winter in New York is no joke.
Headphones > hat.
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
3
1 comment

Like

Comment

Repost

Send
Feed post number 4
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
4mo •  4 months ago • Visible to anyone on or off LinkedIn

Follow

Anthropic vs the Industry. Again.

Anthropic recently patched an exploit that allowed third-party CLI tools like OpenCode to leverage Claude Code subscriptions. As of January 9, the company implemented technical protections that prevent unauthorized clients from impersonating the official Claude Code CLI via header spoofing.

This was always an unofficial workaround, not a supported feature. Third-party tools were effectively tricking Anthropic’s servers by sending spoofed headers to mimic the official client. While many users relied on this setup, it lived firmly in a gray area and arguably brushed up against Anthropic’s terms of service.

What makes this more interesting is the contrast with how the rest of the industry is moving.

OpenAI took the opposite approach. Instead of cracking down, they embraced third-party integration, adding official, supported ways to use ChatGPT Plus and Pro subscriptions with external tools. No hacks. No spoofing. Just legitimate paths for developers to integrate their subscriptions into their workflows.

And it’s not just OpenAI. GitHub Copilot made the same move today, signaling the same philosophy: open integration over lock-in, support over enforcement.

One company builds walls. Others build bridges.

For developers who value ecosystem integration, flexibility, and official support, Anthropic’s crackdown feels increasingly out of sync with where the industry is clearly heading. The choice for developer-friendly AI platforms has never been clearer.
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
46
12 comments

Like

Comment

Repost

Send
Feed post number 5
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
4mo •  4 months ago • Visible to anyone on or off LinkedIn

Follow

🫡
Activate to view larger image,
graphical user interface, text, application
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 6
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
4mo •  4 months ago • Visible to anyone on or off LinkedIn

Follow

social media algos are such a black box. You never know what and why goes viral, so keep posting ⌨️
Activate to view larger image,
text
Activate to view larger image,
like
1
2 comments

Like

Comment

Repost

Send
Feed post number 7
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
4mo • Edited •  4 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

ai won't make you better

It’s 2026. Opus 4.5 writes better code than the average senior developer. It architects entire features from a sentence. It debugs production issues while you grab coffee.

So you use it for everything. Boilerplate, sure. But also auth flows, database migrations, that weird concurrency bug. Why suffer? You’re shipping features that used to take a team of ten. You’re a 10x developer now. Right?

Wrong! And you won’t even notice you’re wrong.

Here’s the trap: AI is a skill amplifier. If you’re smart, you’re 10x smarter with AI. But if you’re d... well, you get the idea.

Let’s say Opus 4.5 writes 90% of really good code. What will that number be in 3 years? It doesn’t matter, the answer will still be “below 100%.” That gap means real devs will be needed to fix the edge cases, the weird bugs, the production fires. And I believe those devs will be rare.

It’s hilarious when I hear “you gotta learn AI coding.” Learn what, exactly? Prompting in Cursor? “Agent orchestration” in Claude Code? ☠️

You should learn to code if you can’t code and want to be a coder. You should keep coding even if you’re a senior+ mega pro max coder. Because without reps and errors, your skills take a permanent vacation. Keep them close.

The devs who thrive won’t be the ones who use AI the most. They’ll be the ones who know exactly when not to.
Activate to view larger image,
No alternative text description for this image

See content credentials
Activate to view larger image,
like
1

Like

Comment

Repost

Send
Feed post number 8
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
4mo •  4 months ago • Visible to anyone on or off LinkedIn

Follow

im excited to announce that I’m open to new opportunities before my code becomes too legendary to afford. NYC
Activate to view larger image,
shape
Activate to view larger image,
like
7
1 repost

Like

Comment

Repost

Send
Feed post number 9
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
5mo •  5 months ago • Visible to anyone on or off LinkedIn

Follow

You can understand the last 5 years of AI through 5 Sam Altman quotes

No alternative text description for this image

No alternative text description for this image

No alternative text description for this image

No alternative text description for this image
+2

See content credentials
Activate to view larger image,
like
2
1 comment

Like

Comment

Repost

Send
Feed post number 10
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
5mo •  5 months ago • Visible to anyone on or off LinkedIn

Follow

Google’s “nano-banana” moment got topped… quickly.
If this is “GPT Image 1.5”, I’m very curious what 2.0 looks like ☠️
It's now waaay faster and ... works.
Activate to view larger image,
graphical user interface, application

See content credentials
Activate to view larger image,
like
1
4 comments

Like

Comment

Repost

Send
Feed post number 11
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
5mo • Edited •  5 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

The most useful AI prompt I've found: "What's wrong with this?"

Not "make X for me." Just: "Here's my plan, what's wrong with it?"

I was building a CLI to set up Linear projects via GraphQL. 
Mutations working. Labels creating. Felt ready to ship.
So I asked Claude: "What's wrong with this?"

It came back with:
• What if the seed file is missing? What if labels already exist, skip/error? What if the API key is malformed? ...

Yeah, it was just a simple tool for my own use, something I could build with my eyes closed and forget about. But making it a habit to run everything through this "what's wrong with this?" loop really changes how you think and progress in whatever you do!
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
likelove
6
4 comments

Like

Comment

Repost

Send
Feed post number 12
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

Holly moly! Anthropic is gonna finally fix their website with the help of awesome Bun devs 🧑‍🍳
View Mike Krieger’s  graphic link
Mike KriegerMike Krieger
   • 2ndVerified • 2nd
Instagram co-founder, now building at Anthropic LabsInstagram co-founder, now building at Anthropic Labs
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow
Today we announced that Anthropic is acquiring Bun, the JavaScript runtime and toolkit built by Jarred Sumner and his team.

Jarred and his team rethought the entire JavaScript toolchain from first principles while remaining focused on real use cases. Claude Code reached $1 billion in revenue in only 6 months, and bringing the Bun team into Anthropic means we can scale the infrastructure to build on that momentum and keep pace with the exponential growth in AI adoption.

Bun will remain open source and MIT-licensed. We'll keep investing in making it the best runtime, bundler, package manager, and test runner for JavaScript and TypeScript developers. All while building even better workflows into Claude Code.
Looking forward to building together.

https://lnkd.in/gTycquVy
Interlocking puzzle piece with complex geometric shape and detailed surface texture
Anthropic acquires Bun as Claude Code reaches $1B milestone
anthropic.com
like
3
1 comment

Like

Comment

Repost

Send
Feed post number 13
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

AI Engineer Summit in NYC blew past my expectations!
Easily one of the strongest engineering events I’ve attended.
I got to speak directly with the Gemini 3 Pro core team, watch Cursor ship updates live with Lee Robinson, and meet an absurd number of deeply technical builders pushing the edge of what’s possible.

Events like this show how much potential New York has as an AI engineering hub, and honestly, we need way more of them!
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
likecelebrate
7

Like

Comment

Repost

Send
Feed post number 14
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

Smells like a brand new car. It's always so good to see how technologies you use every day makes your life better. 

Next.js 14 --> Next.js 16
Turbopack is awesome. Build time 3x faster, dev start 2x faster!
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
1

Like

Comment

Repost

Send
Feed post number 15
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

Lmao. ClosedAI indeed in panic mode

Tech & AI MemesTech & AI Memes
3,829 followers3,829 followers
6mo • Edited •  6 months ago • Edited • Visible to anyone on or off LinkedIn

Follow
Where's your AGI, Sam?
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 16
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

Cloudflare explaining what happened and how they fixed it. Must read for any software developer mid+ 
https://lnkd.in/eg6GA__Q
Activate to view larger image,
diagram
Activate to view larger image,
like
4
1 comment

Like

Comment

Repost

Send
Feed post number 17
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo • Edited •  6 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

Seeing a spike in outages and bugs across major platforms lately.

With AI taking over more of the development workflow, I can’t help wondering if we’re moving faster than our quality processes can handle.

Funny enough, even Twitter was down today, and it feels strange posting about it here on LinkedIn, but the pattern is getting hard to ignore 💀
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
1
2 comments

Like

Comment

Repost

Send
Feed post number 18
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

Want to cut your AI costs? Speak English.

Here’s a fun fact from TikTokenizer:
A short 13-word sentence in English breaks down into exactly 13 tokens.
Translate that same sentence into Spanish, and suddenly, it jumps to 20 tokens.

Since providers like OpenAI, Anthropic, and Google bill based on token usage, the same idea can cost roughly 50% more in another language, a serious difference at scale!

Why?
Most modern LLMs are trained primarily on English-heavy web data. Their tokenization algorithms are optimized around the most common English word patterns, so other languages get “split” more finely, which drives up token counts (and your bill).

If your product depends on AI APIs, test token usage across languages early. Scaling internationally can surprise your CFO
Activate to view larger image,
graphical user interface, text, application, chat or text message
Activate to view larger image,
like
1
2 comments

Like

Comment

Repost

Send
Feed post number 19
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

Pure gold!
View Alex Hormozi’s  graphic link
Alex HormoziAlex Hormozi
   • 3rd+Premium • 3rd+
Founder Acquisition.com, Co-Founder Skool.com. Get your free scaling roadmap👇Founder Acquisition.com, Co-Founder Skool.com. Get your free scaling roadmap👇
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow
You don't need a mentor.
What you need instead is to:


1. Fire yourself up.
2. Create your own deadlines.
3. Hold yourself accountable.
4. Do more than anyone asked you to make yourself proud.
5. If you're waiting for someone to believe in you, start with yourself.

Like

Comment

Repost

Send
Feed post number 20
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
6mo •  6 months ago • Visible to anyone on or off LinkedIn

Follow

Did you know you can get a perfectly structured output from an AI model every time?

Most AI responses aren’t usable out of the box, walls of text, explanations, random notes that break your UI.

But when you need structure, like plotting egg prices from 2015 to 2020 to build a chart, you don’t need fluff. You need clean { year, price } objects.
That’s where Zod + AI SDK fits in (see the attached image)

 You define the schema → AI fills the data → you get a predictable JSON response, awesome right?
Activate to view larger image,
graphical user interface, text, application
Activate to view larger image,
like
3

Like

Comment

Repost

Send
Feed post number 21
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

If you're tired of "You're absolutely right" and "yes man" mode always on when talking to an AI Model, here's a quick fix: ChatGPT --> Profile --> Personalization --> Custom Instructions
(or just as plain text in every new chat, try it and tell me how it is):

"
Always critically evaluate and challenge user suggestions, even
when they seem reasonable.
**USE BRUTAL HONESTY:** Don't try to be polite or agreeable. Be direct,
challenge assumptions, and point out flaws immediately. 
"
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 22
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

I’d better figure it out with console.log
View Nick Cosentino’s  graphic link
Nick CosentinoNick Cosentino
   • 2ndPremium • 2nd
Principal Software Engineering Manager at MicrosoftPrincipal Software Engineering Manager at Microsoft
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow
I'm guilty. Who else?

hashtag#SoftwareEngineering hashtag#Developers hashtag#Memes
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
2

Like

Comment

Repost

Send
Feed post number 23
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

Strongly disagree. That's actually where the real fun begins
View Michael Kisilenko’s  graphic link
Michael KisilenkoMichael Kisilenko
   • 2ndPremium • 2nd
Founder @ AnyxFounder @ Anyx
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow
That's why I love reading others' code.

Code never lies. It just exposes your thought process.
Activate to view larger image,
graphical user interface, text, application
Activate to view larger image,
like
4
1 comment

Like

Comment

Repost

Send
Feed post number 24
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

Well, Open AI Atlas. 
Before, I'd explore a website in one browser window and juggle ChatGPT in another anyway, switching back and forth for questions, plus the exhausting context dumps every time.

Now, it's all in one comfy, minimal browser with integrated AI. Definitely weaving it into my workflow. (Didn't vibe with agents' flow, though)
Activate to view larger image,
graphical user interface, application
Activate to view larger image,
like
1
1 comment

Like

Comment

Repost

Send
Feed post number 25
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

For devs it’s more like answers from stack overflow. The question is where will those answers come from in 5-10 years from now

Tech & AI MemesTech & AI Memes
3,829 followers3,829 followers
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow
Bro explained it better than anyone else.
Activate to view larger image,
graphical user interface, text, application, chat or text message
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 26
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

I did it so you don’t have to. Jailbreak for chat GPT:

Is there a seahorse emoji?

Play
Remaining time 
0:33
1x

Playback speed

Unmute

Turn fullscreen on
like
1
1 comment

Like

Comment

Repost

Send
Feed post number 27
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

Don't overcomplicate things. If it can be built deterministically (without AI), it should be. 

It's genuinely upsetting when I see people use AI for tasks that could be easily handled without it. It's simpler, cheaper, and much more maintainable.
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
3

Like

Comment

Repost

Send
Feed post number 28
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

A new Open AI agent builder is actually not an agent builder at all, here is why:

A new Open AI agent builder, is actually not an agent builder at all, here is why:
Kirill Gertsik ✪
like
2
1 comment

Like

Comment

Repost

Send
Feed post number 29
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

🌕 Captured this tonight just a random shot of the moon on the new iPhone 17 Pro Max.

Crazy how far smartphone cameras have come, the detail and light control are unreal.
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
1
1 comment

Like

Comment

Repost

Send
Feed post number 30
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow

Wow it’s a huge shift! Bye bye radix
View Max Wells’  graphic link
Max WellsMax Wells
 • 3rd+3rd+
AI Rust Engineer 🦀AI Rust Engineer 🦀
7mo •  7 months ago • Visible to anyone on or off LinkedIn

Follow
I foresee a future where Shadcn will totally go away from Radix UI.


The latest changelog already points in that direction.
New components now work with every component library.
Not just Radix.


This marks a big shift toward true flexibility and independence.

Developers will be able to use Shadcn components anywhere.
No more tight coupling to one accessibility or styling system.


It’s becoming a design layer, not just a component kit.
Shadcn is evolving into something bigger.
A universal UI standard might be taking shape right in front of us.


That's my take.
I guess we'll see in the future.

Peace! ✌️

hashtag#shadcn hashtag#ui
…more
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
1
1 comment

Like

Comment

Repost

Send
Feed post number 31
Kirill’s profile photo
Kirill Gertsik ✪ reposted this

View Michael Kisilenko’s  graphic link
Michael KisilenkoMichael Kisilenko
   • 2ndPremium • 2nd
Founder @ AnyxFounder @ Anyx
Visit my website
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow
The real nightmare: O(n) bedtime complexity.
Activate to view larger image,
diagram
Activate to view larger image,
likefunnylove
91
6 comments
3 reposts

Like

Comment

Repost

Send
Feed post number 32
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

The battle is over. NextAuth.js (Auth.js) has joined Better Auth.

Key points:
 • Better Auth won because it is better :)
 • Auth.js still works. It will be maintained by the Better Auth team, so no panic migration.
 • You should not use Auth.js for new projects. Use Better Auth instead. You will probably love it more (see the first bullet point)
 • One less debate topic.

Details in original article from Better Auth: https://lnkd.in/eZkyjUPQ
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
likeloveinsightful
6
2 comments
1 repost

Like

Comment

Repost

Send
Feed post number 33
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

I don’t like this photo from open ai office. I need another meet up in NYC 🥺
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
likefunny
2
3 comments

Like

Comment

Repost

Send
Feed post number 34
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

Most developers treat system design and DSA (yes, LeetCode) as pure interview prep. That mindset is short‑sighted. 

These skills don’t just help you pass a test, they change how you work, think, and create. I’ve been digging into both these past few days. The takeaways surprised me: 

DSA = efficiency mindset
- Trains you to recognize complexity
- Helps you spot bottlenecks
- Sharpens query optimization skills
- Beyond the basics, deep algorithms rarely matter in full‑stack work (funny enough, the harder the puzzle, the less useful it is day to day).

System design = daily reality
- Scale, resilience, APIs, databases, caching, async workflows
- Bad design breaks fast, good design lasts
- This is where engineers separate from “just coders”

The kicker: It’s not either/or
- DSA builds the problem‑solving muscle
- System design gives you the architecture to ship at scale
- Together, they turn you from someone who writes code to someone who engineers solutions

And yes, bonus points: get really good at both and you unlock big tech, free food, and endless swag. What else do you want?
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
likeinsightful
5
2 comments

Like

Comment

Repost

Send
Feed post number 35
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

It was a really great and fun 🍸 event from OpenAI , and personal thanks to @edwinwee1 for the invitation! Hope this thing I proposed about study mode in the Codex extension gets a chance to live. I’m ready to help just in case 🫡
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
4

Like

Comment

Repost

Send
Feed post number 36
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

A nice and elegant way to save state without going "use client" just store it in cookies :) Good example from vercel!
Activate to view larger image,
text
Activate to view larger image,
like
2

Like

Comment

Repost

Send
Feed post number 37
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

Someone’s gonna be fired :(
View Maria Sukhareva’s  graphic link
Maria SukharevaMaria Sukhareva
   • 3rd+Verified • 3rd+
Anti-Hype AI Educator & Keynote Speaker | AI Realist Founder | Workshops & Trainings | 30K+ | All views are solely my ownAnti-Hype AI Educator & Keynote Speaker | AI Realist Founder | Workshops & Trainings | 30K+ | All views are solely my own
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow
These are two nightmares in one: the nightmare of a developer having your CEO present your product, and the nightmare of the presenter. Watch till the end, there’s a bonus nightmare too.

hashtag#AI hashtag#Tech

Play
Remaining time 
2:39
1x

Playback speed

Turn closed captions on

Unmute

Turn fullscreen on
like
2
1 comment

Like

Comment

Repost

Send
Feed post number 38
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

What would you ask OpenAI devs If you could?
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
insightfullike
2
2 comments

Like

Comment

Repost

Send
Feed post number 39
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

But you’ll get a way smarter during this hours
View Michael Kisilenko’s  graphic link
Michael KisilenkoMichael Kisilenko
   • 2ndPremium • 2nd
Founder @ AnyxFounder @ Anyx
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow
Why fix it in 6 minutes when you can break it in 6 hours?
Activate to view larger image,
graphical user interface, text, application
Activate to view larger image,
likefunny
5

Like

Comment

Repost

Send
Feed post number 40
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

I’ve been told, by countless people, that I’m the best React/Next.js developer they’ve ever worked with…so why am I having such a tough time finding a job? 

I don’t care about the salary. I can happily live off less than $150K in NYC, even though I know I’m worth more. I will commute 30 to 45 minutes on the subway, one way, arriving on time or even early for standups. I don’t log off exactly at 5 pm. I step-up, step-in, and volunteer for the challenging features when others shy away or make excuses to not take on complex tickets. I advocate for clean code, I empathize with user needs, and I ship what needs to be shipped (unless it compromises security or accessibility, obviously). I acknowledge that I will challenge architectural decisions with questions if I think there’s a better approach; but, I also recognize that the tech lead is in charge. Right now, I’m a developer without a codebase…a React engineer without any components to build. So I’m sending this post out into the LinkedIn Universe hoping that someone, somewhere, in NYC has to be looking for someone like me.
like
3

Like

Comment

Repost

Send
Feed post number 41
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

⚙️ Backend developers often face an interesting question: When is the right time to start optimizing data storage at the column type level?

For example, in SQL databases (MySQL, Postgres, SQL Server), you don’t just have a single INTEGER type, you have multiple options like TINYINT, SMALLINT, INT, and BIGINT. Each takes different amounts of memory and has different ranges.

At first glance, this may seem like micro-optimization. But in large-scale systems, especially with high-traffic apps or analytical datasets, choosing the right numeric type can actually translate into:
• 🚀 Better performance (smaller rows = faster queries & indexes)
• 💾 Lower storage & infra costs (especially at scale)
• ✅ Cleaner, more intentional database design

The real question is: At what stage of your journey as a backend dev should you start caring about this?
• Do juniors need to worry about it early on?
• Is this more of a mid-level awareness milestone?
• Or is it something you only obsess over when working with massive datasets at senior/architect level?

I’d love to hear how others have approached this. 🔍
 When did you start thinking critically about data type choices in your career?
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
4
4 comments

Like

Comment

Repost

Send
Feed post number 42
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

✨ From Struggle to Growth ✨

The craziest academic challenge I’ve ever taken on was attempting the CFA Level 1 exam with only very basic English skills.

For six months, I was basically studying 12–14 hours a day. My routine was brutal:
• Read the material
• Write down every word I didn’t know
• Learn the words
• Re-read the material until I could translate every word into Russian
• Only then actually learning the topic

It was an endless cycle of reading, translating, and re-reading. Honestly, it felt insane at times.

In the end, I came just a few percentage points short of passing. On paper, that looks like failure. But in reality, it was one of the most transformative experiences of my life.

By the time I walked out of the exam room, my English had gone from “barely functional” to “fluent.” I could hold conversations I never thought possible just half a year earlier.

Yes! It was the hardest and most depressing six months I’ve ever gone through. But it also taught me something I carry with me every day as a software engineer:
• Growth often hides inside struggle
• Failure can be the best teacher
• The skills you gain along the way may be more valuable than the certificate itself
Sometimes, the journey matters more than the result. 🚀
like
2
1 comment

Like

Comment

Repost

Send
Feed post number 43
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
8mo •  8 months ago • Visible to anyone on or off LinkedIn

Follow

🚀 From IPOs to Code and Back Again?

For 5 years, I lived and breathed IPO analysis. Reading 100‑page SEC prospectuses, breaking down financials, spotting opportunities before companies went public, it was my world! 

Then I pivoted. For the last 3 years, I’ve been building software as a frontend developer (and learning fullstack along the way). 

But here’s the thing: I can’t shake this idea. What if I could build an app that automates the IPO research process, essentially outsourcing the work I used to do manually? I know the pain points, I know the workflows, and I know the tech.

The timing, though, is tricky. Right now I’m:
- Deep in a job search
- Prepping for interviews (hello, LeetCode 👋)
- Maintaining my ETHGlobal winner project

So I’m torn. Do I double down on the job hunt, or carve out time to chase this idea while IPO activity is heating up?

If you were in my shoes, what would you do?
like
1
3 comments
4 reposts

Like

Comment

Repost

Send
Feed post number 44
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
9mo • Edited •  9 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

🏆 We won the Best Use of ENS Prize ($1,000) at ETHGlobal New York 2025!

ETHGlobal is one of the largest hackathon series in the US, and the NYC edition brought together 800+ attendees, 690 hackers, and 275 projects.

The Challenge: 36 hours to build something that matters in Web3.

Our Solution: StartupChain - a platform revolutionizing how founders launch onChain startups with:
• Multi-owner ENS domains with automated equity splits
• Gasless onboarding (solving Web3's biggest UX problem)
• Transparent, verifiable corporate structure
• Smart contract-based role management

My Role: Full-stack engineer handling the entire frontend, backend architecture, and Web3 integrations (Next.js, TypeScript, Wagmi, Safe SDK). Our team included a talented product manager/designer and a brilliant Solidity developer.

We’re continuing the build. Live: https://startupchain.io
Showcase: https://lnkd.in/ee-yVf2W

hashtag#ETHGlobal hashtag#NewYork hashtag#Hackathon
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
7
2 comments

Like

Comment

Repost

Send
Feed post number 45
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow

Ouh, these unstoppable debates about vibe coding… NO imo, vibe coding has nothing to do with real coding at all. Like, NOTHING. You don’t look at the code, you don’t understand how it works, and you have no idea what to do when it breaks, and when the vibe-coding tool can’t help you anymore, you’re stuck.

Anyone who actually tries it for themselves will clearly see the difference. There’s no way to build anything meaningful with it. An MVP? Sure. But a secure, maintainable project? No chance, no matter what tool you use.

Lovable, v0, Cursor, even Claude Code — these are tools that speed up real developers. And honestly, it’s still debatable. After spitting out some features in “one shot,” developers usually pay a much higher price in maintenance than if they had just built it manually with maybe a bit of autocomplete.
View Roy Derks’  graphic link
Roy DerksRoy Derks
   • 2ndVerified • 2nd
Building AI products for developers at IBM | Developer Experience & AI | Public Speaker & AuthorBuilding AI products for developers at IBM | Developer Experience & AI | Public Speaker & Author
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow
Is vibe coding really coding?

Andrej Karpathy once said that with vibe coding, "you don’t touch the code."

You describe what you want, and the AI writes it for you.
No syntax errors, no boilerplate, no hours lost in docs (in theory)

But does that still count as coding?

For some, coding means writing, debugging, deploying code.
For others, it now means directing agents, testing outputs, and iterating on prompts.

The definition of coding is shifting. And thereby the language used from Java, JavaScript, Python, C++. etc is shifting toward natural language.

Maybe the real skill is no longer knowing how to write code.
It’s knowing what to build and how to ask for the code.

What do you think?
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
1 comment

Like

Comment

Repost

Send
Feed post number 46
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow

Yeah big thanks to CapGemini! It was really cool!
View Daniel Curtin’s  graphic link
Daniel CurtinDaniel Curtin
   • 3rd+Premium • 3rd+
Executive Technology Recruiter | 📊 AI & Data Analytics Talent Strategist | ☁️ Cloud Technology & Salesforce Hiring Expert | 🌐 Talent ConnectorExecutive Technology Recruiter | 📊 AI & Data Analytics Talent Strategist | ☁️ Cloud Technology & Salesforce Hiring Expert | 🌐 Talent Connector
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow
Just attended the AI2030 Summit 

Earlier this week, I had the privilege of joining Tech Pulse 2030: AI FutureMakers – Building Next-Gen Innovations, a summit that brought together some of the brightest minds shaping the future of artificial intelligence.

Special thanks to Cap Gemini NYC for hosting the event.

 If you're building AI, Data Science, or Analytics teams and need help finding top-tier talent in this space — let’s connect. I specialize in recruiting niche, high-impact AI & Data professionals who are driving innovation forward.

📩 DM me or drop a comment below — happy to support your hiring goals.

hashtag#AI2030 hashtag#TechPulse2030 hashtag#ArtificialIntelligence hashtag#Innovation hashtag#FutureMakers hashtag#NextGenTech hashtag#LeadershipInAI hashtag#DataAnalytics
Activate to view larger image,
graphical user interface, website
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 47
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow

I went deeper into the cloud market, like AWS, Azure, and Co using my research skills and found some pretty interesting data below. If you’re anywhere close to software development, read on and maybe even act 👇

 ☁︎ is BOOMING: The market’s on track to hit $2.39T (yes, trillion!) by 2030, with a massive 20.4% CAGR. It’s not “over”—it’s just heating up!

🚀 AWS dominates the startup scene: 30% market share, preferred by 70%+ of US startups, and 290+ AWS startup jobs right now in NYC alone.

💰 Salaries reward cloud skills: Certified AWS devs at startups average $120,583—that’s ~19% higher than the typical startup offer in 2025.

🧑‍💻 If you build with React/Next.js: There’s high demand for engineers who pair modern front-end with AWS know-how (think serverless, Lambda, S3, Amplify). I'm full stack (next/react) and I'm thinking...

🎯 AWS Developer Associate > Solutions Architect for most devs: The exam is hands-on, dev-centric, and matches what startups want: CI/CD, API integration, serverless deployments.

🪜 Career path is crystal-clear: AWS Developer Associate → DevOps Engineer ($115K-$170K) → Solutions Architect Pro ($140K-$190K+).

📚 Action plan: Get AWS fundamentals, build real projects (deploy your Next.js app to AWS), study for AWS Developer Associate, join tech/startup circles, repeat!

If you’re skipping cloud, you’re missing out on the biggest tech shift of our era.
Activate to view larger image,
graphical user interface
Activate to view larger image,
like
2
2 comments

Like

Comment

Repost

Send
Feed post number 48
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow

I don't mind this happening at all. The demand for software engineers will be huge just a few years from now. AI won't even be close to doing the full software engineering job.
View Catalin Pit’s  graphic link
Catalin PitCatalin Pit
   • 2ndVerified • 2nd
Building Documenso (the open-source DocuSign)Building Documenso (the open-source DocuSign)
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow
Finally some sense being spoken.

“AWS CEO Matt Garman dismissed the idea of replacing junior staff with AI as the dumbest thing he's ever heard, arguing that these employees are inexpensive and AI-savvy. Instead, it's important to continue to hire and train junior developers to create a future workforce with critical thinking and problem-solving skills.”
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 49
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow

It’s hard to see how Cursor can truly compete with Claude Code without having its own AI model.

Claude Code currently gives you around 40 hours of AI-assisted work per week, while Cursor offers about 10 at most. That’s a huge gap in capability for developers who rely heavily on AI in their workflow.

The only reasons I see Cursor still holding its ground are:


- Developers who love its “vibe coding” experience and aren’t ready to dive deep into terminal workflows (yet)
- People who simply haven’t discovered Claude Code
And honestly, it’s about the same story with a lot of “vibe AI” websites—like v0, Lovable, Replit, and others. They’re fun, they look great, but without deeper capabilities or more generous usage, it’s hard to justify them over more powerful alternatives.

If Cursor (and these platforms) want to stay competitive long-term, they’ll need to either close that gap in AI availability or bring something truly game-changing to the table.

hashtag#SoftwareEngineering hashtag#AI hashtag#DeveloperTools hashtag#cursor hashtag#lovable hashtag#claudecode
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
1

Like

Comment

Repost

Send
Feed post number 50
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
9mo •  9 months ago • Visible to anyone on or off LinkedIn

Follow

GPT 5 is coming this Thursday. AGI?
Activate to view larger image,
graphical user interface, text, application
Activate to view larger image,
likesupport
2
4 comments

Like

Comment

Repost

Send
Feed post number 51
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
10mo •  10 months ago • Visible to anyone on or off LinkedIn

Follow

This is insane, but I'm finally building a task-tracker. With Convex😁
I've been managing same stuff on paper for years.
PAPER. In 2025.
I don't care if anyone else uses it, but I definitely will.
Breaking some rules posting 10% ready app😬
Activate to view larger image,
graphical user interface, website
Activate to view larger image,
like
3

Like

Comment

Repost

Send
Feed post number 52
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
10mo •  10 months ago • Visible to anyone on or off LinkedIn

Follow

Just found an awesome site for non-designers!
Simply pick your main color (or any color you like), and it suggests a palette that won't make your users' eyes bleed. No registration, simple UX, and super helpful. Check it out! mycolor.space
Activate to view larger image,
graphical user interface
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 53
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
10mo •  10 months ago • Visible to anyone on or off LinkedIn

Follow

I've fallen in love with Convex. I honestly can't imagine coding without it anymore, everything else feels like some '90s stuff.

The good news is, I'm currently job hunting, so I have plenty of time to dive deep and play around with it until I get back to "normal" programming with ORMs and Postgres servers.
Activate to view larger image,
diagram
Activate to view larger image,
like
2

Like

Comment

Repost

Send
Feed post number 54
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
10mo • Edited •  10 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

🌟 Prisma ORM vs Drizzle: Game Over for Prisma? 🌟

Is Drizzle about to dethrone Prisma in the ORM world? As a senior web dev who's built tons of production with Next, React and TypeScript, I keep hearing this debate. Drizzle crushes it on speed, stays super lightweight, fits serverless like a glove, and gets you honing real SQL skills that work anywhere. Prisma's custom queries? Not so much outside its own playground. But is Prisma done for? Let's break it down pragmatically. Spoiler: Drizzle's gaining ground fast, though it's not a complete wipeout.

1. Speed and Size:
Drizzle isn't just faster. It's a lean machine (under 100KB gzipped compared to Prisma's chunkier bundle) that turns out optimized SQL and cuts query times in intense setups. Perfect for serverless on Vercel or AWS Lambda. No pooling issues, all efficiency. Chasing those sub-100ms responses? This is where Prisma starts looking outdated.

2. Developer Experience:
Prisma's not out of the fight. It shines for fast prototyping with type-safe clients, auto schemas, and easy migrations. Those declarative queries are a breeze for React teams dodging SQL headaches. But with efficiency demands rising, does it hold up? Drizzle gives you that safety plus actual SQL. If you're skipping portable skills, are you truly advancing?

3. Serverless and Skills:
Drizzle owns serverless with no hassle and inspires SQL mastery, a smart edge in any dev job. Prisma's language is cool in its zone, but useless elsewhere. For building solid, future-proof apps, this trend seems unstoppable.

My Strategic Take: 
- Starting out with ORMs and just wanna play around for side projects? Go with Prisma. It's simpler, offers way more perks, and who cares about 20x the size or 4x slower speed if your app isn't under heavy load?

- Wanna pick an ORM you can use literally anywhere for loaded-up apps and get closer to real backend stuff like SQL? It's Drizzle.

What's your take? Have you made the switch? Drop your thoughts below, let's chat!

UPD: 
Prisma has responded, claiming significant performance improvements after recent updates. They’ve shared their benchmark results here: https://lnkd.in/epUTNDk8

Additionally, they’ve addressed serverless compatibility issues by transitioning from Rust to TypeScript and WASM, which they say boosts performance and flexibility - https://lnkd.in/efsYMcJW

On the other hand, Drizzle maintains that they’re still faster. You can check out their benchmarks here: https://lnkd.in/e6U-hRiQ

‼️ I’ll be testing updated versions of both in the future. This topic is fascinating, and as you can see, competition really drives innovation!
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
likelovecelebrate
29
7 comments
3 reposts

Like

Comment

Repost

Send
Feed post number 55
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
10mo •  10 months ago • Visible to anyone on or off LinkedIn

Follow

💡 Optimizing Database Costs with Subnames

As developers, we're always looking for ways to optimize performance and reduce costs. One strategy that has saved me so much money is leveraging subnames for database tables.

Instead of creating new tables for higher-tier use cases (which can quickly escalate costs), you can dynamically reuse the same table structure with subnames. This approach is not only cost-effective but also keeps your database schema clean and scalable.

Here’s a quick example using Drizzle ORM with SingleStore:
Activate to view larger image,
text
Activate to view larger image,
like
4

Like

Comment

Repost

Send
Feed post number 56
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo •  11 months ago • Visible to anyone on or off LinkedIn

Follow

Insights from Google Show: A Quick Website Speed Isn’t Just Nice to Have - IT IS ESSENTIAL. Slow Websites Must Spend Literally 2x More on Marketing Than Fast Ones.

This chart highlights the relationship between Largest Contentful Paint (LCP: how fast your website’s main content loads) and user behavior. Faster load times lead to lower bounce rates (yellow bars: the percentage of visitors who leave your site without interacting) and higher conversion rates (black line: how likely visitors are to convert, e.g., sign up, purchase, etc., relative to the slowest group).

Now, imagine this:
Your business has a marketing website, and you’re buying traffic at $2 per click with a total ad budget of $100,000. That drives 50,000 visitors to your site.

- If your site loads within 0.2–0.6 seconds, you could achieve a 10% conversion rate (on the higher end for optimized sites), resulting in 5,000 signups or purchases.
- But if your site’s LCP is slower—say 2.6–3.0 seconds—your conversion rate might drop to 5%, leaving you with only 2,500 signups.

💀 That’s a 50% drop!
So, it’s literally the same whether you spend $50,000 with a website built by devs who know their stuff (rare, I know) or spend $100,000 and get the same results just because someone forgot to optimize an image or compress a video. Isn’t that insane?!

What are your thoughts on web performance as a growth strategy? Let’s discuss!
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
2
1 comment

Like

Comment

Repost

Send
Feed post number 57
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo •  11 months ago • Visible to anyone on or off LinkedIn

Follow

The Great Battle of Cursor vs Copilot is Finally Over for Me 

After almost a year of using Cursor as my main personal IDE for side projects and hustles, I’ve decided to switch back to VS Code + Copilot, which I primarily use at work.

Why? I stopped seeing much difference between the two, except for the subscription cost ($20 vs $10). Cursor is definitely ahead in some areas, but VS Code is catching up fast.

I don’t use Cursor’s new agentic mode, and my prompts are thorough enough that I don’t really need the bigger context or extra features Cursor provides.

Would be nice to hear someone else’s experience with these tools, how do you use them, and what works best for you?

Let’s see if Cursor releases something groundbreaking again that convinces me to switch back.

hashtag#Coding hashtag#SoftwareEngineering hashtag#IDE hashtag#ProductivityTools
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
4
2 comments

Like

Comment

Repost

Send
Feed post number 58
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo •  11 months ago • Visible to anyone on or off LinkedIn

Follow

UPD: He actually agreed to the changes. So, t3.chat will get rid of the AI model state synchronization across tabs and switch to a URL-based approach.

We win 🥂
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo • Edited •  11 months ago • Edited • Visible to anyone on or off LinkedIn

Follow
Over 20k on Twitter overnight. Turns out it wasn’t just my pain after all.

https://lnkd.in/eK2_hVQ4

UPD: He actually agreed to the changes. So, t3.chat will get rid of the AI model state synchronization across tabs and switch to a URL-based approach.
Activate to view larger image,
text
Activate to view larger image,
like
1

Like

Comment

Repost

Send
Feed post number 59
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo • Edited •  11 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

Over 20k on Twitter overnight. Turns out it wasn’t just my pain after all.

https://lnkd.in/eK2_hVQ4

UPD: He actually agreed to the changes. So, t3.chat will get rid of the AI model state synchronization across tabs and switch to a URL-based approach.
…more
Activate to view larger image,
text
Activate to view larger image,
1 repost

Like

Comment

Repost

Send
Feed post number 60
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo • Edited •  11 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

What Makes a Great Software Engineer?

There are only 4 skills every SWE needs to succeed:


1. Breaking problems into steps
This is a foundational skill that applies to any field, not just software engineering. It’s something you can learn, but it’s also a mindset—being able to break down complex challenges into manageable pieces is critical for solving problems efficiently.



2. Understanding how data flows through your app
This goes beyond databases and backend requests. It’s about understanding how your code works within the framework you’re using. Are you writing functional or class-based code? Are you using state managers? Is your app rendering on the client or server? Even within React and Next.js, the approaches can vary significantly (e.g., server components). These are the kinds of details that separate good engineers from great ones.



3. Reading error messages and troubleshooting
It’s not just about fixing errors—it’s about doing it efficiently. Using AI tools to debug can save time and prevent costly downtime. The ability to adapt to modern tools and workflows is a game-changer.



4. Asking for help with the right context
This is one of the most underrated skills. Knowing how to communicate effectively, collaborate with your team, and understand the product you’re building is just as important as technical expertise.


♨️ When you combine these skills with a solid understanding of your tools and frameworks, you’re on the path to becoming an exceptional engineer.
like
2
1 comment

Like

Comment

Repost

Send
Feed post number 61
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo • Edited •  11 months ago • Edited • Visible to anyone on or off LinkedIn

Follow

AI Tools for Every Developer (2025 Edition)
You better save this — your future self will thank you. 

- Cursor – A standalone VS Code–based IDE that understands your entire codebase. Autocomplete, refactor, or rewrite code via natural language. Far superior to GitHub Copilot.

- Phind – A developer-focused search engine that delivers ready-to-run code snippets when StackOverflow answers fall short. Feels like modern docs—perfect for today’s stacks.

- t3Chat – My go-to AI chat for debugging, coding questions, or anything you’d use ChatGPT for—but faster. Gives access to GPTs, Claude, Gemini, and more for just $8/month. Bonus: GPT image generation included! I use it for logos, hero-section images, and more.

- CodeRabbit – Automates code reviews directly in VS Code or PRs. Provides security, style, and test suggestions while learning your preferences over time.

- v0 – AI tool from Vercel. Perfect for prototyping, MVPs, or building components quickly. Just prompt and get your ready-to-copy/paste code with a live preview. Works seamlessly in the browser.
--------
P.S. There's much more, but these are my core tools I use every day.

#DeveloperTools #AIForDev #Tech2025
Activate to view larger image,
graphical user interface, application
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 62
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo •  11 months ago • Visible to anyone on or off LinkedIn

Follow

Yeah, it’s actually pretty sad to see the direction Apple is heading. I remember when their bright ideas were shaping entire markets. The times have definitely changed.
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,

Like

Comment

Repost

Send
Feed post number 63
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo •  11 months ago • Visible to anyone on or off LinkedIn

Follow

It was my first time attending #NewYorkTechWeek, and here’s my take:

It’s incredibly inspiring to casually chat with people you usually only see on TV, hearing their perspectives on the future of AI in industries I’d never even considered. The open environment made it easy to ask questions without moderation and realize that, at the end of the day, we’re all on the same page—shaping the future together.

Special thanks to John Rakolta III, President of Walbridge, for lighting up the room and making complex topics feel casual and approachable!

P.S. He only let me post the selfie if he looked good—I think that’s fair. 😄

#TechCommunity #AIInnovation
Activate to view larger image,
No alternative text description for this image
Activate to view larger image,
like
2

Like

Comment

Repost

Send
Feed post number 64
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
11mo •  11 months ago • Visible to anyone on or off LinkedIn

Follow

JavaScript vs TypeScript

Let’s be real: TypeScript doesn’t make a great first impression.
When I first picked it up, it felt like a giant headache. Everything was slower, more complicated.

“Interfaces? Types? What even is a generic and why does it hate me?”
I couldn’t understand why we were adding layers of pain on top of good ol’ JavaScript.

But then… it clicked.

The number of runtime bugs I hit dropped a lot.
And the weirdest thing? I started understanding my own code better. Like, way better.

TypeScript forces you to think.
Not just: “Okay, here’s a function that does something.”
But: “Here’s a function that takes this exact shape of data, does this specific thing, and returns this specific type.”
That tiny shift in how you think about functions?
It changes everything.

You stop YOLO’ing logic together and start designing it — on purpose.
Believe me, that shift is huge.
It makes your code self-documenting, easier to refactor, and way less fragile.

Now it feels impossible to code without it.
And the autocomplete, intelligent suggestions, and crystal-clear types? Chef’s kiss.
It’s like going from IKEA instructions to full-blown blueprints.

So don’t avoid it. Embrace it.
You’ll thank yourself in three pull requests.
Activate to view larger image,
text
Activate to view larger image,
likeinsightfulcelebrate
370
48 comments
9 reposts

Like

Comment

Repost

Send
Feed post number 65
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
1yr •  1 year ago • Visible to anyone on or off LinkedIn

Follow

It’s hard to explain the level of frustration or the number of posts I’ve written lately about how terribly AI handles modern stacks.

I’m a huge fan of every shiny new library that fixes an old bug or makes something cleaner. So yeah, I try to use the most up-to-date tools wherever I can, especially on side projects.

And AI? It still thinks we’re writing React like it’s 2020.
But too many things have drastically changed since then, and the gap is painfully obvious.

Looks like the dude from #Upstash finally made a decent attempt to fix that mess.
Excited to give it a spin.
https://lnkd.in/eaWi_3fm
Activate to view larger image,
graphical user interface
Activate to view larger image,
like
3
2 comments

Like

Comment

Repost

Send
Feed post number 66
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
1yr •  1 year ago • Visible to anyone on or off LinkedIn

Follow

Never-ending story of INNOVATIONS TAKING JOBS 😕

This has literally happened with every major tech shift.

Entire careers were built around telegraph operators - a super common, respected job at the time. Then the phone showed up and poof, adapt or disappear. Same thing with landlines → mobile → internet → AI → and a billion more after that.

Driving isn’t humanity’s fallback career. People driving Ubers today can absolutely pivot into something more meaningful (and way less risky) than ferrying strangers around for minimum wage - especially in cities like SF, LA, or NYC, where a “wrong passenger” isn’t just a fear, it’s a shift hazard.

Innovation isn’t evil. But good innovation should pull people up, not push them out. We’ve got to stop acting like preserving every outdated job is noble. It’s not. Helping people evolve is.
View Mangesh Pimpalkar’s  graphic link
Mangesh PimpalkarMangesh Pimpalkar
   • 3rd+Premium • 3rd+
Senior Software Engineer | AI First | 2x Patent Holder | React 19, Nextjs, Typescript, AWSSenior Software Engineer | AI First | 2x Patent Holder | React 19, Nextjs, Typescript, AWS
1yr •  1 year ago • Visible to anyone on or off LinkedIn

Follow
I had a conversation with my kid about the new driverless taxi app, Waymo. My son was excited to try it out. I asked him what he thought about its impact on the whole system. He looked confused.

I then asked him if he thought it was a good way to share money. I explained that we need to think about what will happen to the drivers who used to earn a living from driving. Uber created many jobs and offered extra earning opportunities, which helped share money more fairly. But with Waymo, the profits might only go to a few people at the top. After he graduates, he may struggle to find jobs unless he invents something new.

He started to understand that this might not be a positive invention. I told him that good inventions create jobs and help people instead of hurting them.

For example, automatic faucet dispensers changed how we get water. People used to turn on the tap, but now they just wave their hands. This innovation didn't take jobs away, it created more jobs and improved hygiene.

In summary, a good invention is one that creates more jobs and shares money fairly. We need to support inventions that benefit everyone, not just a few people.
like
3

Like

Comment

Repost

Send
Feed post number 67
View Kirill Gertsik ✪’s  graphic link
Kirill Gertsik ✪Kirill Gertsik ✪
   • 2ndPremium • 2nd
Full Stack Developer | React, Node.js, Next.js | Ex-Financial AdvisorFull Stack Developer | React, Node.js, Next.js | Ex-Financial Advisor
1yr •  1 year ago • Visible to anyone on or off LinkedIn

Follow

🧠 “What’s the most complex task you’ve done so far?”
Ah, the classic interview question.

And honestly? I always want to answer:
“There are no truly complex tasks on the frontend…
unless you count a JavaScript bug triggered by a dependency update from a team on the other side of the ocean.”

Most frontend tasks are:
“Here’s a JSON. Put it on the screen. Make it look good. Bonus points if it doesn’t jump on hover.”

But the real complexity? That happens on the side.
I’m building an IPO analytics tool, and this one isn’t your average “data in, chart out” project:

📉 I'm using the official SEC EDGAR API, which rate-limits requests like it's still living in 2006. So I cache and structure everything in a database first, or risk getting blocked.
🐍 Had to spin up a Python backend (Next.js doesn’t do Python) to parse 100+ page filings. JavaScript libraries weren’t reliable enough for XBRL parsing — Python was the better tool for the job.
🧠 Then I wrote logic to detect comparable companies from past IPOs, run sentiment analysis on MD&A sections, and calculate dynamic scores for valuation, revenue trends, and more.

And that’s maybe 2% of the roadmap.

This isn’t just a fun build - it’s a puzzle that forces me to think like a product manager, engineer, data analyst, and investor all at once.

That’s the kind of challenge I’m after. That’s the level I’m aiming to bring to the next thing 🫡
like
3
1 comment

Like

Comment

Repost

Send