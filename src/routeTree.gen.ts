/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StackComparisonImport } from './routes/stack-comparison'
import { Route as SpacerCalculatorImport } from './routes/spacer-calculator'
import { Route as BikeCompareImport } from './routes/bike-compare'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const StackComparisonRoute = StackComparisonImport.update({
  id: '/stack-comparison',
  path: '/stack-comparison',
  getParentRoute: () => rootRoute,
} as any)

const SpacerCalculatorRoute = SpacerCalculatorImport.update({
  id: '/spacer-calculator',
  path: '/spacer-calculator',
  getParentRoute: () => rootRoute,
} as any)

const BikeCompareRoute = BikeCompareImport.update({
  id: '/bike-compare',
  path: '/bike-compare',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/bike-compare': {
      id: '/bike-compare'
      path: '/bike-compare'
      fullPath: '/bike-compare'
      preLoaderRoute: typeof BikeCompareImport
      parentRoute: typeof rootRoute
    }
    '/spacer-calculator': {
      id: '/spacer-calculator'
      path: '/spacer-calculator'
      fullPath: '/spacer-calculator'
      preLoaderRoute: typeof SpacerCalculatorImport
      parentRoute: typeof rootRoute
    }
    '/stack-comparison': {
      id: '/stack-comparison'
      path: '/stack-comparison'
      fullPath: '/stack-comparison'
      preLoaderRoute: typeof StackComparisonImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/bike-compare': typeof BikeCompareRoute
  '/spacer-calculator': typeof SpacerCalculatorRoute
  '/stack-comparison': typeof StackComparisonRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/bike-compare': typeof BikeCompareRoute
  '/spacer-calculator': typeof SpacerCalculatorRoute
  '/stack-comparison': typeof StackComparisonRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/bike-compare': typeof BikeCompareRoute
  '/spacer-calculator': typeof SpacerCalculatorRoute
  '/stack-comparison': typeof StackComparisonRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/bike-compare' | '/spacer-calculator' | '/stack-comparison'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/bike-compare' | '/spacer-calculator' | '/stack-comparison'
  id:
    | '__root__'
    | '/'
    | '/bike-compare'
    | '/spacer-calculator'
    | '/stack-comparison'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BikeCompareRoute: typeof BikeCompareRoute
  SpacerCalculatorRoute: typeof SpacerCalculatorRoute
  StackComparisonRoute: typeof StackComparisonRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BikeCompareRoute: BikeCompareRoute,
  SpacerCalculatorRoute: SpacerCalculatorRoute,
  StackComparisonRoute: StackComparisonRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/bike-compare",
        "/spacer-calculator",
        "/stack-comparison"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/bike-compare": {
      "filePath": "bike-compare.tsx"
    },
    "/spacer-calculator": {
      "filePath": "spacer-calculator.tsx"
    },
    "/stack-comparison": {
      "filePath": "stack-comparison.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
