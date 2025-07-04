
export const BlogSkeleton = () => {
    return (
        <div role="status" className="max-w-2xl border-b-1 border-slate-300 pt-8 pb-3 animate-pulse">
            <div className="flex justify-left pb-2">
                <div className="h-7 bg-gray-200 rounded-full w-7"></div>
                <div className="flex justify-center flex-col">
                    <div className="flex justify-center text-sm pl-2">
                        <div className="flex justify-center flex-col">
                            <div className="h-2 bg-gray-200 rounded-full w-10"></div>
                        </div>
                        <div className="px-2 flex justify-center flex-col text-slate-500">
                            • 
                        </div>
                        <div className="flex justify-center flex-col">
                            <div className="h-2 bg-gray-200 rounded-full w-10"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="h-3 bg-gray-200 rounded-full max-w-sm mb-2.5"></div>
            </div>
            <div>
                <div className="h-2 bg-gray-200 rounded-full max-w-2xl mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-2xl mb-2.5"></div>
            </div>
            <div className="text-xs text-slate-400 mt-3.5">
                <div className="h-2 bg-gray-200 rounded-full max-w-15"></div>
            </div>
        </div>
    )
}