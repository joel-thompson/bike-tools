# BikeCompare Component Refactoring Plan

## Context

### Component Overview
- `BikeCompare` is a React component that allows users to compare geometry between two bikes
- Located at: `src/components/BikeCompare.tsx`
- Core functionality:
  - Bike selection from dropdown or manual entry
  - Stack/reach comparison calculations
  - URL state management for selections
  - Manual vs automatic calculation modes

### Current Pain Points
- Complex state management mixing URL and local state
- Component handles too many responsibilities
- Duplicate code in bike selection logic
- Manual/auto calculation modes create unnecessary complexity
- Props and event handlers could be more consistent

### Key Dependencies
- @tanstack/react-router for routing/URL state
- shadcn components for UI elements
- Tailwind for styling
- TypeScript for type safety

### Related Files
- `src/bikes.json` - Bike data source
- `src/utils/stackToSpacers.ts` - Core calculation utility
- `src/schemas.ts` - Contains URL parameter schema

## How to Use This Document

### During Implementation
1. Follow the Implementation Order section at the bottom of the document
2. For each phase:
   - Review the plan thoroughly before starting
   - Update the phase status to ⏳ when work begins
   - Fill out Implementation Notes as you go:
     - List all files changed
     - Document key decisions and their rationale
     - Note any challenges encountered
     - Describe solutions implemented
   - Update status to ✅ when phase is complete
   - If blocked, update status to ❌ and document the blocker

### Status Updates
- Use the Status Legend at the bottom of the document
- Keep statuses current to track progress
- Update the Implementation Order section to show current focus

### Best Practices
- Document decisions as they're made, not after
- Include enough detail in Implementation Notes to understand changes later
- If a phase's plan needs updating, document the change and why
- Cross-reference related changes between phases

## Goals
- Reduce complexity and improve code organization
- Eliminate code duplication
- Improve component readability and maintainability
- Better separation of concerns

## Phase 1: State Management and Custom Hook
**Status**: ✅ Completed

### Plan
1. Create `useBikeSelection` hook
   - Move URL parameter management logic
   - Handle custom bike state
   - Consolidate bike selection handlers
   ```typescript
   interface UseBikeSelectionResult {
     leftBike: BikeDetails | null;
     rightBike: BikeDetails | null;
     handleBikeSelect: (bikeId: string, side: 'left' | 'right') => void;
     handleCustomBikeChange: (bike: BikeDetails | null, side: 'left' | 'right') => void;
     resetSelection: () => void;
   }
   ```

### Implementation Notes
- Files changed:
  - Created `src/types/bike.ts`
    - Added `BikeDetails` interface with JSDoc comments
    - Added `BikeSide` type for left/right selection
    - Added `SpacerCalculation` interface for calculation results
  - Created `src/hooks/useBikeSelection.ts`
    - Implemented URL state management using tanstack router
    - Added local state for custom bikes
    - Consolidated bike selection handlers
    - Added calculation logic with proper error handling
    - Used object parameters pattern consistently
    - Added comprehensive JSDoc documentation
  - Updated `src/components/BikeCompare.tsx`
    - Integrated useBikeSelection hook
    - Removed duplicate state management
    - Fixed manual mode initialization to preserve selected bike values
    - Improved type safety with imported types

- Key decisions:
  1. Split types into separate file for better organization and reuse
  2. Used TypeScript's discriminated unions for bike side ('left' | 'right')
  3. Made calculation logic more robust with null checks
  4. Used useCallback for all handlers to optimize performance
  5. Kept URL state for bike selection but local state for custom bikes
  6. Preserved existing UX where manual mode inherits selected bike values

- Challenges encountered:
  1. Circular dependency in getBikeDetails usage (fixed by moving function definition)
  2. Needed to handle both URL and local state coherently
  3. Manual vs auto calculation mode complexity
  4. Bug: Manual mode lost selected bike values after refactor (fixed by restoring initialization logic)

- Solutions implemented:
  1. Clear separation between URL and local state
  2. Unified interface for both preset and custom bikes
  3. Automatic calculation in preset mode, manual in custom mode
  4. Proper error handling for bike lookup
  5. Type-safe implementation with comprehensive types
  6. Restored manual mode initialization to preserve UX where users can tweak selected bike values

## Phase 2: Component Splitting
**Status**: ✅ Completed

### Plan
1. Split BikeSelector into focused components
   - Create `BikeCombobox` component
     - Handle only bike selection from dropdown
     - Simplify props interface
   - Create `ManualBikeForm` component
     - Handle only manual bike entry
     - Use object parameters pattern
   - Update BikeSelector to use new components

2. Create `ComparisonResults` component
   - Move calculation display logic
   - Simplify props interface
   - Handle both manual and auto calculations

### Implementation Notes
- Files changed:
  - Created new directory `src/components/BikeCompare/`
  - Created component files:
    - `BikeCombobox.tsx`: Focused dropdown component for bike selection
    - `BikeStats.tsx`: Display component for bike measurements
    - `ManualBikeForm.tsx`: Form component for manual bike entry
    - `ComparisonResults.tsx`: Display component for calculation results
    - `BikeSelector.tsx`: Container component combining selection methods
    - `index.tsx`: Main component and public exports
  - Deleted original files from `src/components/`

- Key decisions:
  1. Used a folder-based component organization to group related components
  2. Created an index.tsx file to:
     - Serve as the main entry point
     - Export sub-components for potential reuse
     - Keep the public API clean
  3. Used relative imports within the BikeCompare folder for better maintainability
  4. Removed unused imports and fixed linting issues
  5. Kept component props interfaces co-located with their components

- Challenges encountered:
  1. Managing imports between components - solved by using relative paths
  2. Linting errors from unused imports - fixed by cleaning up imports
  3. Maintaining component state during refactor - preserved through careful extraction

- Solutions implemented:
  1. Clear component hierarchy:
     ```
     BikeCompare/
     ├── index.tsx (main component + exports)
     ├── BikeSelector.tsx (combines selection methods)
     ├── BikeCombobox.tsx (dropdown selection)
     ├── BikeStats.tsx (measurements display)
     ├── ManualBikeForm.tsx (manual entry)
     └── ComparisonResults.tsx (calculations display)
     ```
  2. Each component has a single responsibility:
     - BikeCombobox: Only handles dropdown selection
     - BikeStats: Only displays measurements
     - ManualBikeForm: Only handles form inputs
     - ComparisonResults: Only displays calculations
     - BikeSelector: Orchestrates selection methods
  3. Improved code organization:
     - Related components are grouped
     - Each component is focused and maintainable
     - Clear separation of concerns
     - Reduced file sizes
     - Better code reusability

## Phase 3: Type Organization
**Status**: ✅ Completed

### Plan
1. Create new types file
   - Move BikeDetails interface
   - Add proper documentation
   - Consolidate search param types

### Implementation Notes
- Discovered that Phase 1 already covered the type organization goals:
  - Types are properly organized in `src/types/bike.ts`
  - All types have JSDoc documentation
  - URL parameter types are handled through Zod schemas in `schemas.ts`
  - Removed redundant `BikeCompareSearchParams` and `BikeSelectionState` interfaces
  - Remaining types (`BikeDetails`, `BikeSide`, `SpacerCalculation`) are actively used

- Key decisions:
  1. Kept URL parameter typing through Zod schema inference
  2. Removed unused type interfaces
  3. Maintained existing type organization from Phase 1

## Phase 4: Calculation Logic
**Status**: 🔄 Not Started

### Plan
1. Move calculation logic to utils
   - Create `calculations.ts` utility file
   - Simplify calculation flow
   - Remove manual vs auto distinction
   - Add proper error handling

2. Update component to use new utilities
   - Simplify calculation triggering
   - Improve error states

### Implementation Notes
- Files changed:
- Key decisions:
- Challenges encountered:
- Solutions implemented:

## Phase 5: Props and Event Handler Consolidation
**Status**: 🔄 Not Started

### Plan
1. Implement object parameters pattern
   - Update component props to use objects
   - Add proper TypeScript interfaces
   - Add JSDoc documentation

2. Consolidate event handlers
   - Create unified handler for bike changes
   - Improve type safety
   - Add proper error handling

### Implementation Notes
- Files changed:
- Key decisions:
- Challenges encountered:
- Solutions implemented:

## Implementation Order
1. ✅ Phase 1 - Foundation for state management
2. ✅ Phase 2 - Component splitting
3. ✅ Phase 3 - Types needed for other phases ⬅️ Next up
4. Phase 4 - Calculation logic
5. Phase 5 - Final cleanup and optimization

## Risks and Mitigations
- **Risk**: Breaking existing functionality during refactor
  - **Mitigation**: Manual testing between phases
- **Risk**: Performance impact from component splitting
  - **Mitigation**: Monitor component rendering and state updates
- **Risk**: URL state management complexity
  - **Mitigation**: Careful state transition handling

## Success Criteria
- [ ] Reduced component complexity
- [ ] Eliminated code duplication
- [ ] Maintained existing functionality
- [ ] Better type safety
- [ ] Cleaner props interfaces

## Status Legend
- 🔄 Not Started
- ⏳ In Progress
- ✅ Completed
- ❌ Blocked
