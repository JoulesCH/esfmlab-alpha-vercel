"use client";

interface props_interface{
    post: {
        title: string;
        content: string;
        categories: string[];
        user: {
            name: string;
            image: string;
            points: number;
        };
    };
    index: number;
}

export default function Post(props:props_interface) {
    const {post, index} = props;

    return <>
        <div className="border-b-2 grid grid-cols-5 gap-4 p-6">
            <div className="columns-sm text-slate-500 text-right pt-1">
                <p>
                    0 likes
                </p>
                <p>
                    0 comments
                </p>
                <p>
                    0 views
                </p>
            </div>

            <div key={index} className=" col-span-4">
                <h2 className="text-xl text-amber-600 font-semibold">{post.title}</h2>
                <p className="text-slate-800">{post.content}</p>
                <div className="grid grid-cols-6 gap-4 p-6">
                    <div className="col-span-3">
                        {post.categories.map((category, index) => (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 m-1">{category}</span>
                        ))}
                    </div>
                    <div className="col-span-1 place-self-end ">
                        <img src={post.user.image} className="w-10 h-10 rounded-full" alt="user image"/>
                    </div>
                    <div className="col-span-2 self-center">
                        <p className="font-medium">{post.user.name}</p>
                        {post.user.points} points
                    </div>
                </div>

            </div>
        
        </div>
    </> 

    
}