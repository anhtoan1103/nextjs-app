# Spending Manager - Design Specification

## 🎨 Design Overview

A clean, modern spending management application with a focus on simplicity and ease of use.

## Color Palette

### Primary Colors
- **Primary Purple**: `#667eea` - Main brand color (buttons, highlights)
- **Secondary Purple**: `#764ba2` - Gradient accent
- **Background**: `#f5f7fa` - Page background
- **White**: `#ffffff` - Cards and containers

### Status Colors
- **Income Green**: `#10b981` - Positive transactions
- **Expense Red**: `#ef4444` - Negative transactions
- **Neutral Gray**: `#6b7280` - Secondary text

### UI Colors
- **Border**: `#e5e7eb`
- **Hover**: `#f9fafb`
- **Text Primary**: `#1f2937`
- **Text Secondary**: `#6b7280`

## 📱 Main Page Layout

### 1. Header Section
- **Background**: Linear gradient (Primary Purple → Secondary Purple)
- **Content**:
  - App title with icon
  - Current balance display in a frosted glass card
  - White text with semi-transparent background

### 2. Statistics Section
- **Tab Navigation**: Week / Month / Year
  - Active tab: Purple background with white text
  - Inactive: White background with border

- **Summary Cards**: 3-column grid
  - Total Income (Green accent)
  - Total Expense (Red accent)
  - Net Savings (Neutral)

- **Chart Area**:
  - Bar chart visualization
  - Different colors for different periods
  - Clean, minimal design

### 3. Transactions Section
- **Header**:
  - "Recent Transactions" title (left)
  - "+ Add Transaction" button (right)

- **Transaction List Items**:
  - Icon (colored background based on category)
  - Transaction name and date
  - Amount (green for income, red for expense)
  - Hover effect: subtle border color change and shadow

## 🔔 Add Transaction Modal

### Layout
- **Overlay**: Dark semi-transparent background (50% opacity)
- **Modal Box**:
  - White background
  - Rounded corners (16px)
  - Drop shadow for depth
  - Max width: 500px

### Form Fields
1. **Type Selection** (Radio Buttons)
   - Expense / Income
   - Icon representation
   - Visual selection state

2. **Description** (Text Input)
   - Placeholder text
   - Full width

3. **Amount & Date** (2-column row)
   - Amount: Number input with decimal
   - Date: Date picker

4. **Category** (Dropdown)
   - Predefined categories:
     - Work & Salary
     - Food & Dining
     - Shopping
     - Transportation
     - Entertainment
     - Bills & Utilities
     - Other

5. **Action Buttons**
   - Cancel (Gray, outlined)
   - Add Transaction (Purple, filled)

## 📐 Spacing & Typography

### Spacing System
- **Extra Small**: 4px
- **Small**: 8px
- **Medium**: 12px
- **Large**: 16px
- **Extra Large**: 20px
- **XXL**: 24px
- **XXXL**: 30px

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**:
  - H1: 28px, Bold
  - H2: 24px, Semi-bold
  - H3: 20px, Semi-bold
- **Body**:
  - Regular: 16px
  - Small: 14px
  - Large: 18px

### Border Radius
- **Small**: 8px (inputs, buttons)
- **Medium**: 12px (cards, transaction items)
- **Large**: 16px (main container, modal)

## 🎯 Key Features

### Interactive Elements
1. **Buttons**:
   - Hover: Slight lift effect (translateY: -2px)
   - Active state with shadow
   - Smooth transitions (0.3s)

2. **Transaction Items**:
   - Hover: Border color change + shadow
   - Cursor pointer on clickable items

3. **Tabs**:
   - Clear active/inactive states
   - Smooth transitions

4. **Form Inputs**:
   - Focus state: Purple border + subtle shadow
   - 2px border width
   - Consistent padding

## 📊 Chart Design

### Bar Chart (Default View)
- **Style**: Rounded top corners
- **Colors**: Gradient from primary to secondary
- **Spacing**: Even distribution
- **Labels**: Below each bar
- **Hover**: Tooltip with exact amount

### Data Views
- **Week**: 7 bars (Mon-Sun)
- **Month**: 4-5 bars (weeks)
- **Year**: 12 bars (months)

## 🎨 Icons & Emojis

### Transaction Categories
- 💵 Income/Salary
- 🛒 Shopping
- ☕ Food & Dining
- 🚗 Transportation
- 💰 Savings/Investment
- 💸 Expense (general)
- 🏠 Bills & Utilities
- 🎮 Entertainment

## 📱 Responsive Design

### Desktop (> 768px)
- Max width: 1200px
- Centered layout
- Full feature set

### Mobile (< 768px)
- Stack summary cards (1 column)
- Adjust chart height
- Full-width buttons
- Simplified navigation

## 🎭 Animations

### Transitions
- Button hover: 0.3s ease
- Card hover: 0.3s ease
- Modal open: Fade + scale effect
- Tab switch: Smooth color transition

### Micro-interactions
- Button press: Slight scale down
- Form focus: Border glow
- Success feedback: Checkmark animation
- Error feedback: Shake animation

## 💡 Usage

1. Open `design-mockup.html` in your browser
2. Take screenshots of different sections
3. Import screenshots into Figma
4. Use as reference for precise design work
5. Extract colors, spacing, and measurements from the spec

---

**Design Philosophy**: Clean, minimal, and user-friendly. Focus on clarity and ease of use over complexity.
