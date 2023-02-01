export default function Button(props ) {
    const {text, color, className, href, onClick} = props
    if(href){
        return (
            <a
                href={href}
                className={`ml-8 inline-flex 
                            items-center justify-center whitespace-nowrap 
                            rounded-md border 
                            border-transparent
                            bg-${color} px-4 py-2 text-base 
                            font-medium text-white shadow-sm 
                            hover:bg-${color} ${className}`}
            >
                {text}
            </a>
        )
    }else{
        return (
            <button
                onClick={onClick}
                className={`ml-8 inline-flex 
                    items-center justify-center whitespace-nowrap 
                    rounded-md border 
                    border-transparent
                    bg-${color} px-4 py-2 text-base 
                    font-medium text-white shadow-sm 
                    hover:bg-${color} ${className}`}
            >
                {text}
            </button>
        )
    }


}