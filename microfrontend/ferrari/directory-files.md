TroopHunter/
┣ .turbo/
┣ .vscode/
┃ ┣ launch.json
┃ ┣ PythonImportHelper-v2-Completion.json
┃ ┣ settings.json
┃ ┗ tasks.json
┣ microfrontend/
┃ ┣ ferrari/
┃ ┃ ┣ src/
┃ ┃ ┃ ┣ app/
┃ ┃ ┃ ┃ ┣ (main)/
┃ ┃ ┃ ┃ ┃ ┣ [slug]/
┃ ┃ ┃ ┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┃ ┃ ┃ ┗ layout.tsx
┃ ┃ ┃ ┃ ┣ @modal/
┃ ┃ ┃ ┃ ┃ ┣ (.)preview/
┃ ┃ ┃ ┃ ┃ ┃ ┗ [id]/
┃ ┃ ┃ ┃ ┃ ┃   ┗ page.tsx
┃ ┃ ┃ ┃ ┃ ┗ default.tsx
┃ ┃ ┃ ┃ ┣ api/
┃ ┃ ┃ ┃ ┃ ┗ health/
┃ ┃ ┃ ┃ ┃   ┗ route.ts
┃ ┃ ┃ ┃ ┣ error.tsx
┃ ┃ ┃ ┃ ┣ layout.tsx
┃ ┃ ┃ ┃ ┣ loading.tsx
┃ ┃ ┃ ┃ ┣ not-found.tsx
┃ ┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┃ ┣ entities/
┃ ┃ ┃ ┃ ┗ README.md
┃ ┃ ┃ ┣ features/
┃ ┃ ┃ ┃ ┗ README.md
┃ ┃ ┃ ┣ processes/
┃ ┃ ┃ ┃ ┗ README.md
┃ ┃ ┃ ┗ shared/
┃ ┃ ┃   ┣ api/
┃ ┃ ┃ ┃ ┃ ┣ client.ts
┃ ┃ ┃ ┃ ┃ ┗ schemas.ts
┃ ┃ ┃   ┣ config/
┃ ┃ ┃ ┃ ┃ ┗ env.ts
┃ ┃ ┃   ┣ lib/
┃ ┃ ┃ ┃ ┃ ┣ animations/
┃ ┃ ┃ ┃ ┃ ┃ ┣ gsap.ts
┃ ┃ ┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┃ ┃ ┗ motion.ts
┃ ┃ ┃ ┃ ┃ ┣ hooks/
┃ ┃ ┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┃ ┃ ┗ useBreakpoint.ts
┃ ┃ ┃ ┃ ┃ ┗ utils/
┃ ┃ ┃ ┃ ┃   ┗ index.ts
┃ ┃ ┃   ┣ providers/
┃ ┃ ┃ ┃ ┃ ┣ AnimationProvider.tsx
┃ ┃ ┃ ┃ ┃ ┣ LenisProvider.tsx
┃ ┃ ┃ ┃ ┃ ┗ Providers.tsx
┃ ┃ ┃   ┣ store/
┃ ┃ ┃ ┃ ┃ ┣ slices/
┃ ┃ ┃ ┃ ┃ ┃ ┗ uiSlice.ts
┃ ┃ ┃ ┃ ┃ ┣ hooks.ts
┃ ┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┃ ┗ provider.tsx
┃ ┃ ┃   ┣ styles/
┃ ┃ ┃ ┃ ┃ ┗ globals.css
┃ ┃ ┃   ┗ ui/
┃ ┃ ┃ ┃   ┗ Button/
┃ ┃ ┃ ┃ ┃   ┣ Button.tsx
┃ ┃ ┃ ┃ ┃   ┗ index.ts
┃ ┃ ┣ .env.development
┃ ┃ ┣ .env.local
┃ ┃ ┣ .env.production
┃ ┃ ┣ .env.staging
┃ ┃ ┣ .gitignore
┃ ┃ ┣ .prettierignore
┃ ┃ ┣ .prettierrc
┃ ┃ ┣ Dockerfile
┃ ┃ ┣ next-env.d.ts
┃ ┃ ┣ next.config.ts
┃ ┃ ┣ package.json
┃ ┃ ┣ postcss.config.mjs
┃ ┃ ┣ tailwind.config.ts
┃ ┃ ┗ tsconfig.json
┣ packages/
┃ ┣ components/
┃ ┃ ┣ .turbo/
┃ ┃ ┃ ┗ turbo-build.log
┃ ┃ ┣ hoc/
┃ ┃ ┃ ┗ AutoFormatText.tsx
┃ ┃ ┣ hooks/
┃ ┃ ┃ ┗ useBreakpoint.ts
┃ ┃ ┣ src/
┃ ┃ ┃ ┣ Animations/
┃ ┃ ┃ ┃ ┣ Appear.tsx
┃ ┃ ┃ ┃ ┣ AppearOnScroll.tsx
┃ ┃ ┃ ┃ ┣ Magnet.tsx
┃ ┃ ┃ ┃ ┣ RotatingText.tsx
┃ ┃ ┃ ┃ ┣ SmoothExpand.tsx
┃ ┃ ┃ ┃ ┗ Spotlight.tsx
┃ ┃ ┃ ┣ Constants/
┃ ┃ ┃ ┃ ┣ Careers/
┃ ┃ ┃ ┃ ┃ ┗ Careers.tsx
┃ ┃ ┃ ┃ ┣ Internships/
┃ ┃ ┃ ┃ ┃ ┗ Internships.tsx
┃ ┃ ┃ ┃ ┣ Offers/
┃ ┃ ┃ ┃ ┃ ┗ OffersData.ts
┃ ┃ ┃ ┃ ┗ Work/
┃ ┃ ┃ ┃   ┗ WorkProjects.ts
┃ ┃ ┃ ┣ DataDisplay/
┃ ┃ ┃ ┃ ┣ OpenRolesList/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ OpenRolesList.tsx
┃ ┃ ┃ ┃ ┗ PricingList/
┃ ┃ ┃ ┃   ┣ index.module.css
┃ ┃ ┃ ┃   ┗ PricingList.tsx
┃ ┃ ┃ ┣ Feedback/
┃ ┃ ┃ ┃ ┗ VideoDialog.tsx
┃ ┃ ┃ ┣ Icons/
┃ ┃ ┃ ┃ ┣ Accessibility.tsx
┃ ┃ ┃ ┃ ┣ Adobe.tsx
┃ ┃ ┃ ┃ ┣ AgileDelivery.tsx
┃ ┃ ┃ ┃ ┣ Analysis.tsx
┃ ┃ ┃ ┃ ┣ Analytics.tsx
┃ ┃ ┃ ┃ ┣ Ansible.tsx
┃ ┃ ┃ ┃ ┣ Architecture.tsx
┃ ┃ ┃ ┃ ┣ Asterisk.tsx
┃ ┃ ┃ ┃ ┣ Authentication.tsx
┃ ┃ ┃ ┃ ┣ Authorization.tsx
┃ ┃ ┃ ┃ ┣ Aws.tsx
┃ ┃ ┃ ┃ ┣ Backend.tsx
┃ ┃ ┃ ┃ ┣ Basket.tsx
┃ ┃ ┃ ┃ ┣ Brain.tsx
┃ ┃ ┃ ┃ ┣ Canva.tsx
┃ ┃ ┃ ┃ ┣ Card.tsx
┃ ┃ ┃ ┃ ┣ CaretDown.tsx
┃ ┃ ┃ ┃ ┣ CaretUp.tsx
┃ ┃ ┃ ┃ ┣ ClickUp.tsx
┃ ┃ ┃ ┃ ┣ Coins.tsx
┃ ┃ ┃ ┃ ┣ CollabSpace.tsx
┃ ┃ ┃ ┃ ┣ CreditCard.tsx
┃ ┃ ┃ ┃ ┣ Cross.tsx
┃ ┃ ┃ ┃ ┣ Dart.tsx
┃ ┃ ┃ ┃ ┣ Data.tsx
┃ ┃ ┃ ┃ ┣ Database.tsx
┃ ┃ ┃ ┃ ┣ DataBaseOptimization.tsx
┃ ┃ ┃ ┃ ┣ Dentist.tsx
┃ ┃ ┃ ┃ ┣ Devices.tsx
┃ ┃ ┃ ┃ ┣ Docker.tsx
┃ ┃ ┃ ┃ ┣ Edit.tsx
┃ ┃ ┃ ┃ ┣ EndTesting.tsx
┃ ┃ ┃ ┃ ┣ Eye.tsx
┃ ┃ ┃ ┃ ┣ FaceId.tsx
┃ ┃ ┃ ┃ ┣ Figma.tsx
┃ ┃ ┃ ┃ ┣ Flutter.tsx
┃ ┃ ┃ ┃ ┣ FourDot.tsx
┃ ┃ ┃ ┃ ┣ FullStack.tsx
┃ ┃ ┃ ┃ ┣ GitBranch.tsx
┃ ┃ ┃ ┃ ┣ Github.tsx
┃ ┃ ┃ ┃ ┣ Gitlab.tsx
┃ ┃ ┃ ┃ ┣ GitPull.tsx
┃ ┃ ┃ ┃ ┣ Globe.tsx
┃ ┃ ┃ ┃ ┣ GoogleAnalytics.tsx
┃ ┃ ┃ ┃ ┣ GPS.tsx
┃ ┃ ┃ ┃ ┣ GraduateHat.tsx
┃ ┃ ┃ ┃ ┣ GraphAnalysis.tsx
┃ ┃ ┃ ┃ ┣ GraphQL.tsx
┃ ┃ ┃ ┃ ┣ GroupUsers.tsx
┃ ┃ ┃ ┃ ┣ Gsap.tsx
┃ ┃ ┃ ┃ ┣ HandPalm.tsx
┃ ┃ ┃ ┃ ┣ Handshake.tsx
┃ ┃ ┃ ┃ ┣ Heart.tsx
┃ ┃ ┃ ┃ ┣ HighAvailabilty.tsx
┃ ┃ ┃ ┃ ┣ HomeIcon.tsx
┃ ┃ ┃ ┃ ┣ Hotjar.tsx
┃ ┃ ┃ ┃ ┣ HTML.tsx
┃ ┃ ┃ ┃ ┣ Hubspot.tsx
┃ ┃ ┃ ┃ ┣ Infinity.tsx
┃ ┃ ┃ ┃ ┣ Jenkins.tsx
┃ ┃ ┃ ┃ ┣ Kubernetes.tsx
┃ ┃ ┃ ┃ ┣ Laptop.tsx
┃ ┃ ┃ ┃ ┣ Laravel.tsx
┃ ┃ ┃ ┃ ┣ Lightning.tsx
┃ ┃ ┃ ┃ ┣ LoadTesting.tsx
┃ ┃ ┃ ┃ ┣ MagicWand.tsx
┃ ┃ ┃ ┃ ┣ Mailchimp.tsx
┃ ┃ ┃ ┃ ┣ Maintenance.tsx
┃ ┃ ┃ ┃ ┣ Map.tsx
┃ ┃ ┃ ┃ ┣ Mobile.tsx
┃ ┃ ┃ ┃ ┣ Monitor.tsx
┃ ┃ ┃ ┃ ┣ MonoRepoArchitecture.tsx
┃ ┃ ┃ ┃ ┣ Nestjs.tsx
┃ ┃ ┃ ┃ ┣ Nextjs.tsx
┃ ┃ ┃ ┃ ┣ Nodejs.tsx
┃ ┃ ┃ ┃ ┣ OpenBook.tsx
┃ ┃ ┃ ┃ ┣ Owernship.tsx
┃ ┃ ┃ ┃ ┣ PaintSwatch.tsx
┃ ┃ ┃ ┃ ┣ PayPal.tsx
┃ ┃ ┃ ┃ ┣ PerformanceOptimization.tsx
┃ ┃ ┃ ┃ ┣ PieChart.tsx
┃ ┃ ┃ ┃ ┣ PlanetRing.tsx
┃ ┃ ┃ ┃ ┣ PointerCursor.tsx
┃ ┃ ┃ ┃ ┣ Postgresql.tsx
┃ ┃ ┃ ┃ ┣ Prettier.tsx
┃ ┃ ┃ ┃ ┣ PuzzlePiece.tsx
┃ ┃ ┃ ┃ ┣ QA.tsx
┃ ┃ ┃ ┃ ┣ RapidDelivery.tsx
┃ ┃ ┃ ┃ ┣ Reactjs.tsx
┃ ┃ ┃ ┃ ┣ Redux.tsx
┃ ┃ ┃ ┃ ┣ Refresh.tsx
┃ ┃ ┃ ┃ ┣ Responsive.tsx
┃ ┃ ┃ ┃ ┣ RestApi.tsx
┃ ┃ ┃ ┃ ┣ RightArrow.tsx
┃ ┃ ┃ ┃ ┣ Rocket.tsx
┃ ┃ ┃ ┃ ┣ SaaS.tsx
┃ ┃ ┃ ┃ ┣ Scale.tsx
┃ ┃ ┃ ┃ ┣ SecureIntegrations.tsx
┃ ┃ ┃ ┃ ┣ Security.tsx
┃ ┃ ┃ ┃ ┣ Seismometer.tsx
┃ ┃ ┃ ┃ ┣ Selection.tsx
┃ ┃ ┃ ┃ ┣ Selenium.tsx
┃ ┃ ┃ ┃ ┣ Sequelize.tsx
┃ ┃ ┃ ┃ ┣ Shield.tsx
┃ ┃ ┃ ┃ ┣ ShoppingBag.tsx
┃ ┃ ┃ ┃ ┣ ShoppingCart.tsx
┃ ┃ ┃ ┃ ┣ Shuffle.tsx
┃ ┃ ┃ ┃ ┣ Slack.tsx
┃ ┃ ┃ ┃ ┣ Smile.tsx
┃ ┃ ┃ ┃ ┣ Sparkler.tsx
┃ ┃ ┃ ┃ ┣ Squiggle.tsx
┃ ┃ ┃ ┃ ┣ StarIcon.tsx
┃ ┃ ┃ ┃ ┣ Stripe.tsx
┃ ┃ ┃ ┃ ┣ Supabase.tsx
┃ ┃ ┃ ┃ ┣ Support.tsx
┃ ┃ ┃ ┃ ┣ Tailwind.tsx
┃ ┃ ┃ ┃ ┣ Target.tsx
┃ ┃ ┃ ┃ ┣ Terraform.tsx
┃ ┃ ┃ ┃ ┣ Testing.tsx
┃ ┃ ┃ ┃ ┣ TubroRepo.tsx
┃ ┃ ┃ ┃ ┣ TypeScript.tsx
┃ ┃ ┃ ┃ ┣ UnitTesting.tsx
┃ ┃ ┃ ┃ ┣ User.tsx
┃ ┃ ┃ ┃ ┣ UserId.tsx
┃ ┃ ┃ ┃ ┣ VirtualMachines.tsx
┃ ┃ ┃ ┃ ┣ Voltage.tsx
┃ ┃ ┃ ┃ ┣ Wand.tsx
┃ ┃ ┃ ┃ ┣ WebServers.tsx
┃ ┃ ┃ ┃ ┗ Wordpress.tsx
┃ ┃ ┃ ┣ Input/
┃ ┃ ┃ ┃ ┣ Button/
┃ ┃ ┃ ┃ ┃ ┣ Button.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ Fieldset/
┃ ┃ ┃ ┃ ┃ ┣ Fieldset.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ FieldWrapper/
┃ ┃ ┃ ┃ ┃ ┣ FieldWrapper.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ FileUpload/
┃ ┃ ┃ ┃ ┃ ┣ FileUpload.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ HelpMessage/
┃ ┃ ┃ ┃ ┃ ┣ HelpMessage.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ HighlightBox/
┃ ┃ ┃ ┃ ┃ ┣ HighlightBox.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ ListboxField/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ ListboxField.tsx
┃ ┃ ┃ ┃ ┣ ModalCloseButton/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ ModalCloseButton.tsx
┃ ┃ ┃ ┃ ┣ Textarea/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ Textarea.tsx
┃ ┃ ┃ ┃ ┣ TextField/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ Input.tsx
┃ ┃ ┃ ┃ ┣ TimeSlotField/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ TimeSlotField.tsx
┃ ┃ ┃ ┃ ┗ ToggleField/
┃ ┃ ┃ ┃   ┣ index.module.css
┃ ┃ ┃ ┃   ┗ ToggleField.tsx
┃ ┃ ┃ ┣ Interfaces/
┃ ┃ ┃ ┃ ┣ About/
┃ ┃ ┃ ┃ ┃ ┗ About.ts
┃ ┃ ┃ ┃ ┣ Career/
┃ ┃ ┃ ┃ ┃ ┗ CareeerProjectTypes.tsx
┃ ┃ ┃ ┃ ┣ Contact/
┃ ┃ ┃ ┃ ┃ ┗ Contact.ts
┃ ┃ ┃ ┃ ┣ Expertise/
┃ ┃ ┃ ┃ ┃ ┗ Expertise.ts
┃ ┃ ┃ ┃ ┣ Home/
┃ ┃ ┃ ┃ ┃ ┗ Home.ts
┃ ┃ ┃ ┃ ┣ Navigation/
┃ ┃ ┃ ┃ ┃ ┗ Navigation.ts
┃ ┃ ┃ ┃ ┣ Offers/
┃ ┃ ┃ ┃ ┃ ┗ Offers.ts
┃ ┃ ┃ ┃ ┣ PageLayout/
┃ ┃ ┃ ┃ ┃ ┗ PageLayout.ts
┃ ┃ ┃ ┃ ┣ Privacy/
┃ ┃ ┃ ┃ ┃ ┗ Privacy.ts
┃ ┃ ┃ ┃ ┗ Work/
┃ ┃ ┃ ┃   ┣ RoleProjectTypes.ts
┃ ┃ ┃ ┃   ┗ WorkProjectTypes.tsx
┃ ┃ ┃ ┣ Layout/
┃ ┃ ┃ ┃ ┣ AboutGallery/
┃ ┃ ┃ ┃ ┃ ┣ AboutGallery.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ ContentAsideImage/
┃ ┃ ┃ ┃ ┃ ┣ ContentAsideImage.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ LogoGrid/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ LogoGrid.tsx
┃ ┃ ┃ ┃ ┗ WorkGrid/
┃ ┃ ┃ ┃   ┣ index.module.css
┃ ┃ ┃ ┃   ┗ WorkGrid.tsx
┃ ┃ ┃ ┣ Logos/
┃ ┃ ┃ ┃ ┣ coral.tsx
┃ ┃ ┃ ┃ ┣ goldendao.tsx
┃ ┃ ┃ ┃ ┣ honeydu.tsx
┃ ┃ ┃ ┃ ┣ society1.tsx
┃ ┃ ┃ ┃ ┣ totalhealthdentalcare.tsx
┃ ┃ ┃ ┃ ┗ troophunter.tsx
┃ ┃ ┃ ┣ Modals/
┃ ┃ ┃ ┃ ┣ ContactFormModal/
┃ ┃ ┃ ┃ ┃ ┣ ContactFormModal.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ DevelopersModal/
┃ ┃ ┃ ┃ ┃ ┣ DevelopersModal.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ FormModal/
┃ ┃ ┃ ┃ ┃ ┣ FormModal.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ MiniSquadsModal/
┃ ┃ ┃ ┃ ┃ ┗ MiniSquadsModal.tsx
┃ ┃ ┃ ┃ ┣ ScheduleCallModal/
┃ ┃ ┃ ┃ ┃ ┗ ScheduleCallModal.tsx
┃ ┃ ┃ ┃ ┣ SmoothModal/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ SmoothModal.tsx
┃ ┃ ┃ ┃ ┗ SubmitApplicationModal/
┃ ┃ ┃ ┃   ┗ SubmitApplicationModal.tsx
┃ ┃ ┃ ┣ Navigation/
┃ ┃ ┃ ┃ ┣ Dev8XSubmenu/
┃ ┃ ┃ ┃ ┃ ┣ Dev8XSubmenu.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ Header/
┃ ┃ ┃ ┃ ┃ ┣ Header.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┣ HeaderSubmenu/
┃ ┃ ┃ ┃ ┃ ┣ HeaderSubmenu.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃ ┃ ┗ Link/
┃ ┃ ┃ ┃   ┣ index.module.css
┃ ┃ ┃ ┃   ┗ Link.tsx
┃ ┃ ┃ ┗ Surfaces/
┃ ┃ ┃   ┣ ArticleAuthor/
┃ ┃ ┃   ┣ ArticleCard/
┃ ┃ ┃ ┃ ┃ ┣ ArticleCard.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ ArticleContents/
┃ ┃ ┃   ┣ ArticleHero/
┃ ┃ ┃   ┣ ArticleMeta/
┃ ┃ ┃ ┃ ┃ ┣ ArticleMeta.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ ArticleSubscribe/
┃ ┃ ┃   ┣ Author/
┃ ┃ ┃   ┣ AwardsBlock/
┃ ┃ ┃ ┃ ┃ ┣ AwardsBlock.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ BlogList/
┃ ┃ ┃ ┃ ┃ ┣ BlogList.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ BlogPagination/
┃ ┃ ┃ ┃ ┃ ┗ BlogPagination.tsx
┃ ┃ ┃   ┣ Capabilities/
┃ ┃ ┃ ┃ ┃ ┣ Capabilities.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ CardStack/
┃ ┃ ┃ ┃ ┃ ┣ CardStack.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ CareerContents/
┃ ┃ ┃ ┃ ┃ ┣ CareerContents.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ CareersHero/
┃ ┃ ┃   ┣ CareersIntro/
┃ ┃ ┃   ┣ CareersOutro/
┃ ┃ ┃   ┣ CareersPosition/
┃ ┃ ┃   ┣ CareerStudySidebar/
┃ ┃ ┃ ┃ ┃ ┣ CareerStudySidebar.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ CaseStudySidebar/
┃ ┃ ┃ ┃ ┃ ┣ CaseStudySidebar.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ ExpertiseCard/
┃ ┃ ┃ ┃ ┃ ┣ ExpertiseCard.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ FAQs/
┃ ┃ ┃ ┃ ┃ ┣ FAQs.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ FeedSilder/
┃ ┃ ┃ ┃ ┃ ┣ FeedSilder.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ Footer/
┃ ┃ ┃ ┃ ┃ ┣ Footer.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ FooterInternationalContents/
┃ ┃ ┃ ┃ ┃ ┣ FooterInternationalContents.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ FooterRevealPageWrap/
┃ ┃ ┃ ┃ ┃ ┣ FooterRevealPageWrap.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ Hero/
┃ ┃ ┃ ┃ ┃ ┣ Hero.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ HeroCore/
┃ ┃ ┃ ┃ ┃ ┣ HeroCore.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ HomepageLogos/
┃ ┃ ┃ ┃ ┃ ┣ HomepageLogos.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ HomepageShowreel/
┃ ┃ ┃ ┃ ┃ ┣ HomepageShowreel.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ HomepageStats/
┃ ┃ ┃ ┃ ┃ ┣ HomepageStats copy.tsx
┃ ┃ ┃ ┃ ┃ ┣ HomepageStats.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ IconCards/
┃ ┃ ┃ ┃ ┃ ┣ IconCards.tsx
┃ ┃ ┃ ┃ ┃ ┣ IconMap.tsx
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ Layout/
┃ ┃ ┃ ┃ ┃ ┗ layout.module.css
┃ ┃ ┃   ┣ Modal/
┃ ┃ ┃   ┣ ModalCloseButton/
┃ ┃ ┃   ┣ ModularBlocks/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ ModularBlocks.tsx
┃ ┃ ┃   ┣ MvpComp/
┃ ┃ ┃   ┣ OffersCategories/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ OffersCategories.tsx
┃ ┃ ┃   ┣ OffersHero/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ OffersHero.tsx
┃ ┃ ┃   ┣ OffersReel/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ OffersReel.tsx
┃ ┃ ┃   ┣ OffersSlider/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ OffersSlider.tsx
┃ ┃ ┃   ┣ Picture/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ Picture.tsx
┃ ┃ ┃   ┣ Pill/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ Pill.tsx
┃ ┃ ┃   ┣ PricingCategories/
┃ ┃ ┃ ┃ ┃ ┗ PricingCategories.tsx
┃ ┃ ┃   ┣ PricingContents/
┃ ┃ ┃ ┃ ┃ ┗ PricingContents.tsx
┃ ┃ ┃   ┣ PricingStudySidebar/
┃ ┃ ┃ ┃ ┃ ┗ PricingStudySidebar.tsx
┃ ┃ ┃   ┣ ProjectContents/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ ProjectContents.tsx
┃ ┃ ┃   ┣ RichTextImage/
┃ ┃ ┃   ┣ ScheduleCallContent/
┃ ┃ ┃ ┃ ┃ ┗ ScheduleCallContent.tsx
┃ ┃ ┃   ┣ SmoothModalWrapper/
┃ ┃ ┃   ┣ SocialBox/
┃ ┃ ┃   ┣ TestimonialAbout/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ TestimonialAbout.tsx
┃ ┃ ┃   ┣ TestimonialSlider/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ TestimonialSlider.tsx
┃ ┃ ┃   ┣ TextAnimateUp/
┃ ┃ ┃ ┃ ┃ ┗ index.module.css
┃ ┃ ┃   ┣ TextAnimationDown/
┃ ┃ ┃   ┣ VideoPlayer/
┃ ┃ ┃ ┃ ┃ ┗ VideoPlayer.tsx
┃ ┃ ┃   ┣ WhyDev8x/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ WhyDev8X.tsx
┃ ┃ ┃   ┣ WhyWeAreDifferent/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ WhyWeAreDifferent.tsx
┃ ┃ ┃   ┣ WorkCard/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┣ WorkCard.tsx
┃ ┃ ┃ ┃ ┃ ┣ WorkCardContent.tsx
┃ ┃ ┃ ┃ ┃ ┣ WorkCardPicture.tsx
┃ ┃ ┃ ┃ ┃ ┣ WorkCardThumbnail.tsx
┃ ┃ ┃ ┃ ┃ ┣ WorkCardVideo.tsx
┃ ┃ ┃ ┃ ┃ ┗ WorkCardWrapper.tsx
┃ ┃ ┃   ┣ WorkCardStatic/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ WorkCardStatic.tsx
┃ ┃ ┃   ┣ WorkCategories/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ WorkCategories.tsx
┃ ┃ ┃   ┣ WYSIWYG/
┃ ┃ ┃ ┃ ┃ ┣ index.module.css
┃ ┃ ┃ ┃ ┃ ┗ WYSIWYG.tsx
┃ ┃ ┃   ┣ Header.tsx
┃ ┃ ┃   ┣ Hero.tsx
┃ ┃ ┃   ┣ Problems.tsx
┃ ┃ ┃   ┣ Steps.tsx
┃ ┃ ┃   ┗ WorkWithVideos.tsx
┃ ┃ ┣ store/
┃ ┃ ┃ ┣ breakpoint.ts
┃ ┃ ┃ ┣ smoothModalAtom.ts
┃ ┃ ┃ ┗ useProjectModal.tsx
┃ ┃ ┣ utils/
┃ ┃ ┃ ┣ helpers.tsx
┃ ┃ ┃ ┗ lenis.ts
┃ ┃ ┣ .gitignore
┃ ┃ ┣ .prettierrc
┃ ┃ ┣ index.ts
┃ ┃ ┣ package.json
┃ ┃ ┣ tsconfig.json
┃ ┃ ┗ tsconfig.tsbuildinfo
┃ ┣ eslint-config/
┃ ┃ ┣ .eslintrc.base.cjs
┃ ┃ ┗ package.json
┃ ┣ messages/
┃ ┃ ┣ .turbo/
┃ ┃ ┃ ┗ turbo-build.log
┃ ┃ ┣ dist/
┃ ┃ ┃ ┣ Auth.d.ts
┃ ┃ ┃ ┣ Auth.d.ts.map
┃ ┃ ┃ ┣ Auth.js
┃ ┃ ┃ ┣ Auth.js.map
┃ ┃ ┃ ┣ Business.d.ts
┃ ┃ ┃ ┣ Business.d.ts.map
┃ ┃ ┃ ┣ Business.js
┃ ┃ ┃ ┣ Business.js.map
┃ ┃ ┃ ┣ BusinessPhone.d.ts
┃ ┃ ┃ ┣ BusinessPhone.d.ts.map
┃ ┃ ┃ ┣ BusinessPhone.js
┃ ┃ ┃ ┣ BusinessPhone.js.map
┃ ┃ ┃ ┣ BusinessSource.d.ts
┃ ┃ ┃ ┣ BusinessSource.d.ts.map
┃ ┃ ┃ ┣ BusinessSource.js
┃ ┃ ┃ ┣ BusinessSource.js.map
┃ ┃ ┃ ┣ City.d.ts
┃ ┃ ┃ ┣ City.d.ts.map
┃ ┃ ┃ ┣ City.js
┃ ┃ ┃ ┣ City.js.map
┃ ┃ ┃ ┣ CityQueue.d.ts
┃ ┃ ┃ ┣ CityQueue.d.ts.map
┃ ┃ ┃ ┣ CityQueue.js
┃ ┃ ┃ ┣ CityQueue.js.map
┃ ┃ ┃ ┣ Country.d.ts
┃ ┃ ┃ ┣ Country.d.ts.map
┃ ┃ ┃ ┣ Country.js
┃ ┃ ┃ ┣ Country.js.map
┃ ┃ ┃ ┣ index.d.ts
┃ ┃ ┃ ┣ index.d.ts.map
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┣ index.js.map
┃ ┃ ┃ ┣ Lead.d.ts
┃ ┃ ┃ ┣ Lead.d.ts.map
┃ ┃ ┃ ┣ Lead.js
┃ ┃ ┃ ┣ Lead.js.map
┃ ┃ ┃ ┣ LeadBusiness.d.ts
┃ ┃ ┃ ┣ LeadBusiness.d.ts.map
┃ ┃ ┃ ┣ LeadBusiness.js
┃ ┃ ┃ ┣ LeadBusiness.js.map
┃ ┃ ┃ ┣ package.json
┃ ┃ ┃ ┣ Pagination.d.ts
┃ ┃ ┃ ┣ Pagination.d.ts.map
┃ ┃ ┃ ┣ Pagination.js
┃ ┃ ┃ ┣ Pagination.js.map
┃ ┃ ┃ ┣ PostalCode.d.ts
┃ ┃ ┃ ┣ PostalCode.d.ts.map
┃ ┃ ┃ ┣ PostalCode.js
┃ ┃ ┃ ┣ PostalCode.js.map
┃ ┃ ┃ ┣ Queue.d.ts
┃ ┃ ┃ ┣ Queue.d.ts.map
┃ ┃ ┃ ┣ Queue.js
┃ ┃ ┃ ┣ Queue.js.map
┃ ┃ ┃ ┣ State.d.ts
┃ ┃ ┃ ┣ State.d.ts.map
┃ ┃ ┃ ┣ State.js
┃ ┃ ┃ ┣ State.js.map
┃ ┃ ┃ ┣ System.d.ts
┃ ┃ ┃ ┣ System.d.ts.map
┃ ┃ ┃ ┣ System.js
┃ ┃ ┃ ┣ System.js.map
┃ ┃ ┃ ┣ Timezone.d.ts
┃ ┃ ┃ ┣ Timezone.d.ts.map
┃ ┃ ┃ ┣ Timezone.js
┃ ┃ ┃ ┣ Timezone.js.map
┃ ┃ ┃ ┣ User.d.ts
┃ ┃ ┃ ┣ User.d.ts.map
┃ ┃ ┃ ┣ User.js
┃ ┃ ┃ ┗ User.js.map
┃ ┃ ┣ src/
┃ ┃ ┃ ┣ Auth.ts
┃ ┃ ┃ ┣ Business.ts
┃ ┃ ┃ ┣ BusinessPhone.ts
┃ ┃ ┃ ┣ BusinessSource.ts
┃ ┃ ┃ ┣ City.ts
┃ ┃ ┃ ┣ CityQueue.ts
┃ ┃ ┃ ┣ Country.ts
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ Lead.ts
┃ ┃ ┃ ┣ LeadBusiness.ts
┃ ┃ ┃ ┣ Pagination.ts
┃ ┃ ┃ ┣ PostalCode.ts
┃ ┃ ┃ ┣ Queue.ts
┃ ┃ ┃ ┣ State.ts
┃ ┃ ┃ ┣ System.ts
┃ ┃ ┃ ┣ Timezone.ts
┃ ┃ ┃ ┗ User.ts
┃ ┃ ┣ .eslintrc.cjs
┃ ┃ ┣ .gitignore
┃ ┃ ┣ .prettierrc
┃ ┃ ┣ build.config.js
┃ ┃ ┣ package.json
┃ ┃ ┗ tsconfig.json
┃ ┣ middlewares/
┃ ┃ ┣ @types/
┃ ┃ ┃ ┗ express.d.ts
┃ ┃ ┣ src/
┃ ┃ ┃ ┣ apiMiddlware.ts
┃ ┃ ┃ ┣ authMiddleware.ts
┃ ┃ ┃ ┣ authorizeMiddleware.ts
┃ ┃ ┃ ┣ errorHandler.ts
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ notFoundHandler.ts
┃ ┃ ┃ ┗ responseMiddleware.ts
┃ ┃ ┣ .eslintrc.cjs
┃ ┃ ┣ .gitignore
┃ ┃ ┣ .prettierrc
┃ ┃ ┣ build.config.js
┃ ┃ ┣ package.json
┃ ┃ ┗ tsconfig.json
┃ ┣ services/
┃ ┃ ┣ src/
┃ ┃ ┃ ┣ Auth.fetch.ts
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ Leads.fetch.ts
┃ ┃ ┃ ┣ Users.create.ts
┃ ┃ ┃ ┣ Users.fetch.ts
┃ ┃ ┃ ┗ Users.update.ts
┃ ┃ ┣ .eslintrc.cjs
┃ ┃ ┣ .gitignore
┃ ┃ ┣ .prettierrc
┃ ┃ ┣ build.config.js
┃ ┃ ┣ package.json
┃ ┃ ┗ tsconfig.json
┃ ┣ tsconfig-backend/
┃ ┃ ┣ package.json
┃ ┃ ┗ tsconfig.json
┃ ┣ tsconfig-frontend/
┃ ┃ ┣ package.json
┃ ┃ ┗ tsconfig.json
┃ ┣ utils/
┃ ┃ ┣ src/
┃ ┃ ┃ ┣ emailVerification.ts
┃ ┃ ┃ ┣ helper.ts
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ jwt.ts
┃ ┃ ┃ ┣ logger.ts
┃ ┃ ┃ ┣ microserviceUrls.ts
┃ ┃ ┃ ┗ validationUtils.ts
┃ ┃ ┣ .eslintrc.cjs
┃ ┃ ┣ .gitignore
┃ ┃ ┣ .prettierrc
┃ ┃ ┣ build.config.js
┃ ┃ ┣ package.json
┃ ┃ ┗ tsconfig.json
┃ ┗ validator/
┃   ┣ .turbo/
┃ ┃ ┃ ┗ turbo-build.log
┃   ┣ dist/
┃ ┃ ┃ ┣ interfaces/
┃ ┃ ┃ ┃ ┣ Auth.d.ts
┃ ┃ ┃ ┃ ┣ Auth.d.ts.map
┃ ┃ ┃ ┃ ┣ Auth.js
┃ ┃ ┃ ┃ ┣ Auth.js.map
┃ ┃ ┃ ┃ ┣ Business.d.ts
┃ ┃ ┃ ┃ ┣ Business.d.ts.map
┃ ┃ ┃ ┃ ┣ Business.js
┃ ┃ ┃ ┃ ┣ Business.js.map
┃ ┃ ┃ ┃ ┣ BusinessCategory.d.ts
┃ ┃ ┃ ┃ ┣ BusinessCategory.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessCategory.js
┃ ┃ ┃ ┃ ┣ BusinessCategory.js.map
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.d.ts
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.js
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.js.map
┃ ┃ ┃ ┃ ┣ BusinessDay.d.ts
┃ ┃ ┃ ┃ ┣ BusinessDay.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessDay.js
┃ ┃ ┃ ┃ ┣ BusinessDay.js.map
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.d.ts
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.js
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.js.map
┃ ┃ ┃ ┃ ┣ BusinessPhone.d.ts
┃ ┃ ┃ ┃ ┣ BusinessPhone.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessPhone.js
┃ ┃ ┃ ┃ ┣ BusinessPhone.js.map
┃ ┃ ┃ ┃ ┣ BusinessPhoto.d.ts
┃ ┃ ┃ ┃ ┣ BusinessPhoto.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessPhoto.js
┃ ┃ ┃ ┃ ┣ BusinessPhoto.js.map
┃ ┃ ┃ ┃ ┣ BusinessRating.d.ts
┃ ┃ ┃ ┃ ┣ BusinessRating.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessRating.js
┃ ┃ ┃ ┃ ┣ BusinessRating.js.map
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.d.ts
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.js
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.js.map
┃ ┃ ┃ ┃ ┣ BusinessSource.d.ts
┃ ┃ ┃ ┃ ┣ BusinessSource.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessSource.js
┃ ┃ ┃ ┃ ┣ BusinessSource.js.map
┃ ┃ ┃ ┃ ┣ City.d.ts
┃ ┃ ┃ ┃ ┣ City.d.ts.map
┃ ┃ ┃ ┃ ┣ City.js
┃ ┃ ┃ ┃ ┣ City.js.map
┃ ┃ ┃ ┃ ┣ CityQueue.d.ts
┃ ┃ ┃ ┃ ┣ CityQueue.d.ts.map
┃ ┃ ┃ ┃ ┣ CityQueue.js
┃ ┃ ┃ ┃ ┣ CityQueue.js.map
┃ ┃ ┃ ┃ ┣ ClosingHour.d.ts
┃ ┃ ┃ ┃ ┣ ClosingHour.d.ts.map
┃ ┃ ┃ ┃ ┣ ClosingHour.js
┃ ┃ ┃ ┃ ┣ ClosingHour.js.map
┃ ┃ ┃ ┃ ┣ Country.d.ts
┃ ┃ ┃ ┃ ┣ Country.d.ts.map
┃ ┃ ┃ ┃ ┣ Country.js
┃ ┃ ┃ ┃ ┣ Country.js.map
┃ ┃ ┃ ┃ ┣ Day.d.ts
┃ ┃ ┃ ┃ ┣ Day.d.ts.map
┃ ┃ ┃ ┃ ┣ Day.js
┃ ┃ ┃ ┃ ┣ Day.js.map
┃ ┃ ┃ ┃ ┣ GeoPoint.d.ts
┃ ┃ ┃ ┃ ┣ GeoPoint.d.ts.map
┃ ┃ ┃ ┃ ┣ GeoPoint.js
┃ ┃ ┃ ┃ ┣ GeoPoint.js.map
┃ ┃ ┃ ┃ ┣ index.d.ts
┃ ┃ ┃ ┃ ┣ index.d.ts.map
┃ ┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┃ ┣ index.js.map
┃ ┃ ┃ ┃ ┣ Lead.d.ts
┃ ┃ ┃ ┃ ┣ Lead.d.ts.map
┃ ┃ ┃ ┃ ┣ Lead.js
┃ ┃ ┃ ┃ ┣ Lead.js.map
┃ ┃ ┃ ┃ ┣ LeadBusiness.d.ts
┃ ┃ ┃ ┃ ┣ LeadBusiness.d.ts.map
┃ ┃ ┃ ┃ ┣ LeadBusiness.js
┃ ┃ ┃ ┃ ┣ LeadBusiness.js.map
┃ ┃ ┃ ┃ ┣ OpeningHour.d.ts
┃ ┃ ┃ ┃ ┣ OpeningHour.d.ts.map
┃ ┃ ┃ ┃ ┣ OpeningHour.js
┃ ┃ ┃ ┃ ┣ OpeningHour.js.map
┃ ┃ ┃ ┃ ┣ Pagination.d.ts
┃ ┃ ┃ ┃ ┣ Pagination.d.ts.map
┃ ┃ ┃ ┃ ┣ Pagination.js
┃ ┃ ┃ ┃ ┣ Pagination.js.map
┃ ┃ ┃ ┃ ┣ PostalCode.d.ts
┃ ┃ ┃ ┃ ┣ PostalCode.d.ts.map
┃ ┃ ┃ ┃ ┣ PostalCode.js
┃ ┃ ┃ ┃ ┣ PostalCode.js.map
┃ ┃ ┃ ┃ ┣ Queue.d.ts
┃ ┃ ┃ ┃ ┣ Queue.d.ts.map
┃ ┃ ┃ ┃ ┣ Queue.js
┃ ┃ ┃ ┃ ┣ Queue.js.map
┃ ┃ ┃ ┃ ┣ Request.d.ts
┃ ┃ ┃ ┃ ┣ Request.d.ts.map
┃ ┃ ┃ ┃ ┣ Request.js
┃ ┃ ┃ ┃ ┣ Request.js.map
┃ ┃ ┃ ┃ ┣ Response.d.ts
┃ ┃ ┃ ┃ ┣ Response.d.ts.map
┃ ┃ ┃ ┃ ┣ Response.js
┃ ┃ ┃ ┃ ┣ Response.js.map
┃ ┃ ┃ ┃ ┣ State.d.ts
┃ ┃ ┃ ┃ ┣ State.d.ts.map
┃ ┃ ┃ ┃ ┣ State.js
┃ ┃ ┃ ┃ ┣ State.js.map
┃ ┃ ┃ ┃ ┣ Timezone.d.ts
┃ ┃ ┃ ┃ ┣ Timezone.d.ts.map
┃ ┃ ┃ ┃ ┣ Timezone.js
┃ ┃ ┃ ┃ ┣ Timezone.js.map
┃ ┃ ┃ ┃ ┣ User.d.ts
┃ ┃ ┃ ┃ ┣ User.d.ts.map
┃ ┃ ┃ ┃ ┣ User.js
┃ ┃ ┃ ┃ ┗ User.js.map
┃ ┃ ┃ ┣ middleware/
┃ ┃ ┃ ┃ ┣ validationMiddleware.d.ts
┃ ┃ ┃ ┃ ┣ validationMiddleware.d.ts.map
┃ ┃ ┃ ┃ ┣ validationMiddleware.js
┃ ┃ ┃ ┃ ┗ validationMiddleware.js.map
┃ ┃ ┃ ┣ utils/
┃ ┃ ┃ ┃ ┣ convertSchemaToInterface.d.ts
┃ ┃ ┃ ┃ ┣ convertSchemaToInterface.d.ts.map
┃ ┃ ┃ ┃ ┣ convertSchemaToInterface.js
┃ ┃ ┃ ┃ ┣ convertSchemaToInterface.js.map
┃ ┃ ┃ ┃ ┣ convertZodToTypescript.d.ts
┃ ┃ ┃ ┃ ┣ convertZodToTypescript.d.ts.map
┃ ┃ ┃ ┃ ┣ convertZodToTypescript.js
┃ ┃ ┃ ┃ ┣ convertZodToTypescript.js.map
┃ ┃ ┃ ┃ ┣ index.d.ts
┃ ┃ ┃ ┃ ┣ index.d.ts.map
┃ ┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┃ ┣ index.js.map
┃ ┃ ┃ ┃ ┣ response.d.ts
┃ ┃ ┃ ┃ ┣ response.d.ts.map
┃ ┃ ┃ ┃ ┣ response.js
┃ ┃ ┃ ┃ ┗ response.js.map
┃ ┃ ┃ ┣ validators/
┃ ┃ ┃ ┃ ┣ Business.d.ts
┃ ┃ ┃ ┃ ┣ Business.d.ts.map
┃ ┃ ┃ ┃ ┣ Business.js
┃ ┃ ┃ ┃ ┣ Business.js.map
┃ ┃ ┃ ┃ ┣ BusinessCategory.d.ts
┃ ┃ ┃ ┃ ┣ BusinessCategory.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessCategory.js
┃ ┃ ┃ ┃ ┣ BusinessCategory.js.map
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.d.ts
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.js
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.js.map
┃ ┃ ┃ ┃ ┣ BusinessDay.d.ts
┃ ┃ ┃ ┃ ┣ BusinessDay.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessDay.js
┃ ┃ ┃ ┃ ┣ BusinessDay.js.map
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.d.ts
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.js
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.js.map
┃ ┃ ┃ ┃ ┣ BusinessPhone.d.ts
┃ ┃ ┃ ┃ ┣ BusinessPhone.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessPhone.js
┃ ┃ ┃ ┃ ┣ BusinessPhone.js.map
┃ ┃ ┃ ┃ ┣ BusinessPhoto.d.ts
┃ ┃ ┃ ┃ ┣ BusinessPhoto.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessPhoto.js
┃ ┃ ┃ ┃ ┣ BusinessPhoto.js.map
┃ ┃ ┃ ┃ ┣ BusinessRating.d.ts
┃ ┃ ┃ ┃ ┣ BusinessRating.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessRating.js
┃ ┃ ┃ ┃ ┣ BusinessRating.js.map
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.d.ts
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.js
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.js.map
┃ ┃ ┃ ┃ ┣ BusinessSource.d.ts
┃ ┃ ┃ ┃ ┣ BusinessSource.d.ts.map
┃ ┃ ┃ ┃ ┣ BusinessSource.js
┃ ┃ ┃ ┃ ┣ BusinessSource.js.map
┃ ┃ ┃ ┃ ┣ City.d.ts
┃ ┃ ┃ ┃ ┣ City.d.ts.map
┃ ┃ ┃ ┃ ┣ City.js
┃ ┃ ┃ ┃ ┣ City.js.map
┃ ┃ ┃ ┃ ┣ CityQueue.d.ts
┃ ┃ ┃ ┃ ┣ CityQueue.d.ts.map
┃ ┃ ┃ ┃ ┣ CityQueue.js
┃ ┃ ┃ ┃ ┣ CityQueue.js.map
┃ ┃ ┃ ┃ ┣ ClosingHour.d.ts
┃ ┃ ┃ ┃ ┣ ClosingHour.d.ts.map
┃ ┃ ┃ ┃ ┣ ClosingHour.js
┃ ┃ ┃ ┃ ┣ ClosingHour.js.map
┃ ┃ ┃ ┃ ┣ Country.d.ts
┃ ┃ ┃ ┃ ┣ Country.d.ts.map
┃ ┃ ┃ ┃ ┣ Country.js
┃ ┃ ┃ ┃ ┣ Country.js.map
┃ ┃ ┃ ┃ ┣ Day.d.ts
┃ ┃ ┃ ┃ ┣ Day.d.ts.map
┃ ┃ ┃ ┃ ┣ Day.js
┃ ┃ ┃ ┃ ┣ Day.js.map
┃ ┃ ┃ ┃ ┣ GeoPoint.d.ts
┃ ┃ ┃ ┃ ┣ GeoPoint.d.ts.map
┃ ┃ ┃ ┃ ┣ GeoPoint.js
┃ ┃ ┃ ┃ ┣ GeoPoint.js.map
┃ ┃ ┃ ┃ ┣ index.d.ts
┃ ┃ ┃ ┃ ┣ index.d.ts.map
┃ ┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┃ ┣ index.js.map
┃ ┃ ┃ ┃ ┣ Lead.d.ts
┃ ┃ ┃ ┃ ┣ Lead.d.ts.map
┃ ┃ ┃ ┃ ┣ Lead.js
┃ ┃ ┃ ┃ ┣ Lead.js.map
┃ ┃ ┃ ┃ ┣ LeadBusiness.d.ts
┃ ┃ ┃ ┃ ┣ LeadBusiness.d.ts.map
┃ ┃ ┃ ┃ ┣ LeadBusiness.js
┃ ┃ ┃ ┃ ┣ LeadBusiness.js.map
┃ ┃ ┃ ┃ ┣ OpeningHour.d.ts
┃ ┃ ┃ ┃ ┣ OpeningHour.d.ts.map
┃ ┃ ┃ ┃ ┣ OpeningHour.js
┃ ┃ ┃ ┃ ┣ OpeningHour.js.map
┃ ┃ ┃ ┃ ┣ Pagination.d.ts
┃ ┃ ┃ ┃ ┣ Pagination.d.ts.map
┃ ┃ ┃ ┃ ┣ Pagination.js
┃ ┃ ┃ ┃ ┣ Pagination.js.map
┃ ┃ ┃ ┃ ┣ PostalCode.d.ts
┃ ┃ ┃ ┃ ┣ PostalCode.d.ts.map
┃ ┃ ┃ ┃ ┣ PostalCode.js
┃ ┃ ┃ ┃ ┣ PostalCode.js.map
┃ ┃ ┃ ┃ ┣ Queue.d.ts
┃ ┃ ┃ ┃ ┣ Queue.d.ts.map
┃ ┃ ┃ ┃ ┣ Queue.js
┃ ┃ ┃ ┃ ┣ Queue.js.map
┃ ┃ ┃ ┃ ┣ Request.d.ts
┃ ┃ ┃ ┃ ┣ Request.d.ts.map
┃ ┃ ┃ ┃ ┣ Request.js
┃ ┃ ┃ ┃ ┣ Request.js.map
┃ ┃ ┃ ┃ ┣ State.d.ts
┃ ┃ ┃ ┃ ┣ State.d.ts.map
┃ ┃ ┃ ┃ ┣ State.js
┃ ┃ ┃ ┃ ┣ State.js.map
┃ ┃ ┃ ┃ ┣ Timezone.d.ts
┃ ┃ ┃ ┃ ┣ Timezone.d.ts.map
┃ ┃ ┃ ┃ ┣ Timezone.js
┃ ┃ ┃ ┃ ┣ Timezone.js.map
┃ ┃ ┃ ┃ ┣ User.d.ts
┃ ┃ ┃ ┃ ┣ User.d.ts.map
┃ ┃ ┃ ┃ ┣ User.js
┃ ┃ ┃ ┃ ┗ User.js.map
┃ ┃ ┃ ┣ index.d.ts
┃ ┃ ┃ ┣ index.d.ts.map
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┣ index.js.map
┃ ┃ ┃ ┗ package.json
┃   ┣ src/
┃ ┃ ┃ ┣ interfaces/
┃ ┃ ┃ ┃ ┣ Auth.ts
┃ ┃ ┃ ┃ ┣ Business.ts
┃ ┃ ┃ ┃ ┣ BusinessCategory.ts
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.ts
┃ ┃ ┃ ┃ ┣ BusinessDay.ts
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.ts
┃ ┃ ┃ ┃ ┣ BusinessPhone.ts
┃ ┃ ┃ ┃ ┣ BusinessPhoto.ts
┃ ┃ ┃ ┃ ┣ BusinessRating.ts
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.ts
┃ ┃ ┃ ┃ ┣ BusinessSource.ts
┃ ┃ ┃ ┃ ┣ City.ts
┃ ┃ ┃ ┃ ┣ CityQueue.ts
┃ ┃ ┃ ┃ ┣ ClosingHour.ts
┃ ┃ ┃ ┃ ┣ Country.ts
┃ ┃ ┃ ┃ ┣ Day.ts
┃ ┃ ┃ ┃ ┣ GeoPoint.ts
┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┣ Lead.ts
┃ ┃ ┃ ┃ ┣ LeadBusiness.ts
┃ ┃ ┃ ┃ ┣ OpeningHour.ts
┃ ┃ ┃ ┃ ┣ Pagination.ts
┃ ┃ ┃ ┃ ┣ PostalCode.ts
┃ ┃ ┃ ┃ ┣ Queue.ts
┃ ┃ ┃ ┃ ┣ Request.ts
┃ ┃ ┃ ┃ ┣ Response.ts
┃ ┃ ┃ ┃ ┣ State.ts
┃ ┃ ┃ ┃ ┣ Timezone.ts
┃ ┃ ┃ ┃ ┗ User.ts
┃ ┃ ┃ ┣ lib/
┃ ┃ ┃ ┃ ┗ validator.js
┃ ┃ ┃ ┣ middleware/
┃ ┃ ┃ ┃ ┗ validationMiddleware.ts
┃ ┃ ┃ ┣ utils/
┃ ┃ ┃ ┃ ┣ convertSchemaToInterface.ts
┃ ┃ ┃ ┃ ┣ convertZodToTypescript.ts
┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┗ response.ts
┃ ┃ ┃ ┣ validators/
┃ ┃ ┃ ┃ ┣ Business.ts
┃ ┃ ┃ ┃ ┣ BusinessCategory.ts
┃ ┃ ┃ ┃ ┣ BusinessClosingHour.ts
┃ ┃ ┃ ┃ ┣ BusinessDay.ts
┃ ┃ ┃ ┃ ┣ BusinessOpeningHour.ts
┃ ┃ ┃ ┃ ┣ BusinessPhone.ts
┃ ┃ ┃ ┃ ┣ BusinessPhoto.ts
┃ ┃ ┃ ┃ ┣ BusinessRating.ts
┃ ┃ ┃ ┃ ┣ BusinessSocialMedia.ts
┃ ┃ ┃ ┃ ┣ BusinessSource.ts
┃ ┃ ┃ ┃ ┣ City.ts
┃ ┃ ┃ ┃ ┣ CityQueue.ts
┃ ┃ ┃ ┃ ┣ ClosingHour.ts
┃ ┃ ┃ ┃ ┣ Country.ts
┃ ┃ ┃ ┃ ┣ Day.ts
┃ ┃ ┃ ┃ ┣ GeoPoint.ts
┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┣ Lead.ts
┃ ┃ ┃ ┃ ┣ LeadBusiness.ts
┃ ┃ ┃ ┃ ┣ OpeningHour.ts
┃ ┃ ┃ ┃ ┣ Pagination.ts
┃ ┃ ┃ ┃ ┣ PostalCode.ts
┃ ┃ ┃ ┃ ┣ Queue.ts
┃ ┃ ┃ ┃ ┣ Request.ts
┃ ┃ ┃ ┃ ┣ State.ts
┃ ┃ ┃ ┃ ┣ Timezone.ts
┃ ┃ ┃ ┃ ┗ User.ts
┃ ┃ ┃ ┗ index.ts
┃   ┣ .eslintrc.cjs
┃   ┣ .gitignore
┃   ┣ .prettierrc
┃   ┣ build.config.js
┃   ┣ package.json
┃   ┣ README.md
┃   ┗ tsconfig.json
┣ package.json
┗ turbo.json