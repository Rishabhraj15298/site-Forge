import { ArrowLeftIcon, Code2Icon, DownloadIcon, ExternalLinkIcon, EyeIcon, GlobeIcon, Loader2Icon } from 'lucide-react'
import React from 'react'

const BuilderHeader = ({
    projectName,
    version,
    showCode,
    publishing,
    onToggleShowCode,
    onOpenPreview,
    onPublish,
    onDownload,
    onBack,
    onLogout,
}) => {
  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-3 border-b border-zinc-800 bg-[#111113] text-zinc-100">
        <div className="flex items-center gap-2">
            <button onClick={onBack} className='p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer'>
                <ArrowLeftIcon size={16} />
            </button>
            <img src="/Site_logo.png" alt="SiteForge" className="size-5" />
            <span className="text-xs font-semibold tracking-tight text-zinc-300">SiteForge</span>
            <span className="mx-1 h-4 border-l border-zinc-700" aria-hidden="true" />
            <span className="text-sm font-semibold truncate max-w-38 md:max-w-50">{projectName}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium">v{version}</span>
        </div>

        <div className="flex items-center gap-1.5">
            <button onClick={onToggleShowCode}
            className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-zinc-900 ${showCode ? "bg-zinc-800 text-white" : ""}`}>
                {showCode ? (
                    <>
                    <EyeIcon size={13}/> Preview
                    </>
                ) : (
                    <>
                    <Code2Icon size={13}/> Code
                    </>
                )}
            </button>
            <button onClick={onOpenPreview}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-zinc-900'>
                <ExternalLinkIcon size={13} /> Open Preview
            </button>

            <button onClick={onPublish} disabled={publishing} 
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-zinc-900'>
                {publishing ? <Loader2Icon size={13} className="animate-spin"/> : <GlobeIcon size={13}/>} Publish
            </button>

            <button onClick={onDownload}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-zinc-900'>
                <DownloadIcon size={13} /> Export
            </button>

            <button onClick={onLogout}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-zinc-900'>
                Sign out
            </button>
        </div>
    </header>
  )
}

export default BuilderHeader