"use client";
import Post from '../../components/Post'

const posts = [
    {
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, sunt fuga quos voluptatibus explicabo pariatur praesentium doloremque velit nihil similique doloribus iusto nulla aspernatur hic. Nesciunt sed explicabo nemo quam.',
        categories: ['Category 1', 'Category 2'],
        user: {
            name: 'John Doe',
            image: 'https://xsgames.co/randomusers/avatar.php?g=male'
        }
        
    },
    {
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, sunt fuga quos voluptatibus explicabo pariatur praesentium doloremque velit nihil similique doloribus iusto nulla aspernatur hic. Nesciunt sed explicabo nemo quam.',
        categories: ['Category 1', 'Category 2'],
        user: {
            name: 'John Doe',
            image: 'https://xsgames.co/randomusers/avatar.php?g=male'
        }
    },
    {
        title: 'Post 3',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, sunt fuga quos voluptatibus explicabo pariatur praesentium doloremque velit nihil similique doloribus iusto nulla aspernatur hic. Nesciunt sed explicabo nemo quam.',
        categories: ['Category 1', 'Category 2'],
        user: {
            name: 'John Doe',
            image: 'https://xsgames.co/randomusers/avatar.php?g=male'
        }
    }
]

export default function page() {
    return (
        <div className="m-10 pb-[300px]">
            <div className="columns-2">
                <h1 className="text-4xl mb-10">Forum</h1>
                <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <a
                        href="#"
                        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                    >
                        Crear 
                    </a>
                </div>
            </div>
            
            <div>
                {posts.map((post, index) => (
                    <Post  post={post} index={index} />
                ))}
            </div>
        </div>
    )
}