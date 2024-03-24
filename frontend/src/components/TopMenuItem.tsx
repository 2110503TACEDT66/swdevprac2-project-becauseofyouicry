
import Link from 'next/link';
export default function TopMenuItem ({ title, pageRef }:{ title:string, pageRef:string }) {
    return(
        <Link className="w-[120px] text-center mt-auto mb-auto font-serif font-lg text-white" href={pageRef}>
        {title} 
        </Link>
    );
}
