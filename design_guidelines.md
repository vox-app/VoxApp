# Youth Ministry Management App - Design Guidelines

## Design Approach
**Design System Approach**: Using Material Design principles for this data-heavy, enterprise-focused application that prioritizes functionality and usability over visual flair.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light mode: 63 81% 48% (Deep blue for trust and professionalism)
- Dark mode: 220 60% 20% (Dark blue-gray base)

**Accent Colors:**
- Success/Progress: 142 76% 36% (Green for achievements)
- Warning/Goals: 38 92% 50% (Orange for attention items)
- Error/Issues: 0 84% 60% (Red for alerts)

**Background Colors:**
- Light mode: 0 0% 98% (Near white)
- Dark mode: 220 13% 18% (Dark gray with blue undertone)

### B. Typography
**Font Family:** Inter (Google Fonts)
- Headers: 600-700 weight
- Body text: 400 weight
- Data/metrics: 500 weight
- Button text: 500 weight

**Sizes:**
- Page titles: text-2xl
- Section headers: text-xl
- Body text: text-base
- Small labels: text-sm

### C. Layout System
**Spacing Units:** Consistent use of Tailwind units 2, 4, 6, and 8
- Component padding: p-4 or p-6
- Section margins: mb-6 or mb-8
- Button spacing: px-4 py-2
- Card spacing: p-6

### D. Component Library

**Navigation:**
- Clean sidebar navigation for admin dashboard
- Simple top navigation for volunteer views
- Clear role indicators in header

**Data Entry Forms:**
- Structured form layouts with clear labels
- Input validation with inline feedback
- Progress indicators for multi-step processes

**Data Displays:**
- Card-based layouts for entities (members, events)
- Clean tables for attendance records
- Dashboard widgets for key metrics

**Charts & Analytics:**
- Simple bar and line charts for progress tracking
- Pie charts for attendance breakdowns
- Progress bars for goal completion

**Mobile Optimization:**
- Touch-friendly buttons (minimum 44px height)
- Collapsible navigation for mobile
- Simplified volunteer interface for quick data entry

### E. Key Interface Patterns

**Admin Dashboard:**
- Grid layout with metric cards
- Quick action buttons for common tasks
- Recent activity feed
- Goal progress visualization

**Volunteer Interface:**
- Simplified, single-purpose screens
- Large, clear action buttons
- Minimal navigation options
- Quick attendance marking interface

**Entity Management:**
- List/grid view toggle for members
- Advanced filtering and search
- Bulk action capabilities
- Clear CRUD operation flows

## Accessibility & Usability
- High contrast ratios for text readability
- Consistent dark mode implementation
- Clear visual hierarchy with proper heading structure
- Keyboard navigation support
- Loading states for data operations
- Error handling with clear user feedback

## Design Principles
1. **Clarity over decoration** - Function-first design
2. **Consistent patterns** - Reusable components throughout
3. **Role-appropriate complexity** - Simplified volunteer views, detailed admin interfaces
4. **Mobile-first approach** - Optimized for volunteer phone usage
5. **Data-driven design** - Clear visualization of ministry metrics and progress