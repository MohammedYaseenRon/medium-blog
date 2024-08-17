import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

//where we were in the medium page and opened for the first time there was a loader  amd second we agin clicked there was no loader
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () =>{
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(loading || !blog) {
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div> 
    
    }

    return <div>
        <FullBlog blog={blog}/>
    </div>
}