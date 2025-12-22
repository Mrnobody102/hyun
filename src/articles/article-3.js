export const article3 = {
    id: 3,
    title: 'Mastering PostgreSQL Indexing Strategies for Large Databases',
    category: 'Database',
    author: 'Phạm Quang Huy',
    date: 'Dec 5, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    excerpt: 'Deep dive into PostgreSQL indexing techniques, query optimization, and performance tuning strategies for handling millions of records efficiently.',
    content: `
## Mastering PostgreSQL Indexing Strategies for Large Databases

PostgreSQL is a powerful relational database, but performance depends heavily on proper indexing. This guide covers advanced indexing strategies for databases with millions of records.

### Understanding PostgreSQL Indexes

An index is a separate data structure that improves query speed at the cost of additional disk space and slower writes.

### Common Index Types

#### B-tree Indexes (Default)

Suitable for most use cases:

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
\`\`\`

#### Hash Indexes

Fast equality comparisons:

\`\`\`sql
CREATE INDEX idx_product_sku USING HASH ON products(sku);
\`\`\`

#### GiST and GIN Indexes

For full-text search and JSON data:

\`\`\`sql
CREATE INDEX idx_articles_content ON articles USING GIN(to_tsvector('english', content));
CREATE INDEX idx_metadata ON items USING GIN(metadata);
\`\`\`

### Query Optimization

Use EXPLAIN ANALYZE to understand query execution:

\`\`\`sql
EXPLAIN ANALYZE
SELECT u.id, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id
ORDER BY order_count DESC
LIMIT 10;
\`\`\`

### Partial Indexes

Index only relevant rows:

\`\`\`sql
CREATE INDEX idx_active_users ON users(email) 
WHERE status = 'active';
\`\`\`

### Performance Monitoring

Regular maintenance is crucial:

\`\`\`sql
-- Check index bloat
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Reindex if necessary
REINDEX INDEX CONCURRENTLY idx_users_email;
\`\`\`

### Best Practices

1. Index columns used in WHERE, JOIN, and ORDER BY clauses
2. Avoid over-indexing; each index slows down INSERT/UPDATE/DELETE operations
3. Use EXPLAIN ANALYZE to verify index usage
4. Monitor query performance regularly
5. Consider partial indexes for large tables with status columns

### Conclusion

Proper indexing is essential for database performance. Start with the basics, monitor your queries, and refine your strategy based on actual usage patterns.
    `
};
