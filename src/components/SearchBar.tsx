export default function SearchBar({ keyword, onChange }: { keyword: string; onChange: (keyword: string) => void }) {
    return (
        <div className="flex bg-white border mb-1">
            <input type="text" placeholder="name or username" value={keyword} onChange={(e) => onChange(e.target.value)} className="w-full h-12 px-4" />
        </div>
    );
}
