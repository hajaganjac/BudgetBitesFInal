# BudgetBites Changelog

## [Latest] - 2026-04-15

### Fixed
- **Password Field Focus**: Burger now properly turns around when typing password on both local and Vercel deployment
- **Focus State**: Fixed `focusField` state properly triggering 'password' mode

### Added
- **Police Hat Feature**: When login fails with wrong password, Bun Bon now:
  - Wears a police hat with badge
  - Says "WHO ARE U REALLY" in speech bubble
  - Automatically removes hat after 3 seconds
- **Smart Error Clearing**: Police hat/message disappears when:
  - User starts typing in password field
  - User switches between Login/Register tabs
  - After 3 seconds automatically

### Enhanced
- **Login State Persistence**: Session now saved to localStorage
- **Error Boundary**: Added global error handling with friendly UI
- **Vercel Deployment**: Full production build configuration
  - index.html and src/main.tsx created
  - TypeScript configuration optimized
  - Build tested and working

### Build
- Build time: ~7 seconds
- Bundle size: 935 KB JavaScript, 93 KB CSS
- No TypeScript errors
- Production-ready

## Features Summary

✅ Burger turns around on password focus  
✅ Police hat appears on wrong password  
✅ "WHO ARE U REALLY" speech bubble  
✅ Session persistence across refreshes  
✅ Vercel deployment ready  
✅ Error boundary for crashes  
✅ SPA routing configured  
