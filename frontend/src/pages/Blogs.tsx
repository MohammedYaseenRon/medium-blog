import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs  = () =>{
//create our custom hooks called useBlogs
const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }   
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs. map(blog => <BlogCard 
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"} //author dont have name by default or may be Anonymous
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd feb of 2024"}
                />)}
     
            </div>
        </div>

    </div>
    
}