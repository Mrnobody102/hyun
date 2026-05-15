import React from 'react';

export const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`} />
);

export const ArticleSkeleton = () => (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-6xl space-y-12">
        <div className="text-center space-y-4">
            <Skeleton className="h-10 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="grid gap-8">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <Skeleton className="h-48 w-full md:w-64 flex-shrink-0" />
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const ProjectSkeleton = () => (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-6xl space-y-12">
        <div className="text-center space-y-4">
            <Skeleton className="h-10 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-20 w-full" />
                </div>
            ))}
        </div>
    </div>
);

export const ArticleDetailSkeleton = () => (
    <div className="container mx-auto max-w-4xl px-4 pt-32 pb-20 space-y-10">
        <div className="space-y-6">
            <Skeleton className="h-4 w-24 mx-auto md:mx-0" />
            <Skeleton className="h-16 w-full" />
            <div className="flex justify-center md:justify-start gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
            </div>
        </div>
        <Skeleton className="h-[450px] w-full rounded-2xl" />
        <div className="bg-white dark:bg-slate-800 p-8 md:p-16 rounded-3xl space-y-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-1/2 pt-10" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
    </div>
);
