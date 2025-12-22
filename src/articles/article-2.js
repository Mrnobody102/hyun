export const article2 = {
    id: 2,
    title: 'React Performance Optimization: From 5s to 1s Load Time',
    category: 'Frontend',
    author: 'Phạm Quang Huy',
    date: 'Dec 10, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    excerpt: 'Practical techniques to optimize React applications including code splitting, lazy loading, memoization, and leveraging modern bundling tools for better performance.',
    content: `
## React Performance Optimization: From 5s to 1s Load Time

React applications can become sluggish as they grow in complexity. In this article, we'll explore proven techniques to dramatically improve performance and reduce load times from 5 seconds to just 1 second.

### Identifying Performance Bottlenecks

Start by analyzing your application using React DevTools Profiler and Lighthouse to identify slow components and rendering issues.

### Code Splitting and Lazy Loading

Dynamic imports allow you to split your code into smaller chunks that load only when needed:

\`\`\`jsx
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HeavyComponent />
        </Suspense>
    );
}
\`\`\`

### Memoization Strategies

Prevent unnecessary re-renders using React.memo and useMemo:

\`\`\`jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
    // Only re-renders if props change
    return <div>{props.value}</div>;
});

function Parent() {
    const expensiveValue = useMemo(
        () => computeExpensiveValue(a, b),
        [a, b]
    );
    return <MemoizedComponent value={expensiveValue} />;
}
\`\`\`

### Virtual List Implementation

For long lists, implement virtualization to render only visible items:

\`\`\`jsx
import { FixedSizeList } from 'react-window';

function VirtualList() {
    return (
        <FixedSizeList
            height={600}
            itemCount={1000}
            itemSize={35}
            width="100%"
        >
            {({ index, style }) => (
                <div style={style}>Item {index}</div>
            )}
        </FixedSizeList>
    );
}
\`\`\`

### Bundle Optimization

Use modern bundlers like Vite or Webpack with optimizations:

- Tree shaking to remove unused code
- Minification and compression
- Image optimization with modern formats (WebP)
- Service Workers for offline caching

### Results

By implementing these techniques, we achieved:
- **80% reduction** in initial bundle size
- **4s improvement** in load time
- **60% faster** Time to Interactive (TTI)

### Conclusion

Performance optimization is an ongoing process. Monitor your metrics regularly and continuously improve your application's user experience.
    `
};
