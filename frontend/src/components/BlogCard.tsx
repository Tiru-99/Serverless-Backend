interface blogVariables {
    authorName : string , 
    publishedDate : string,
    title : string , 
    content : string 
}



export const BlogCard = ({
    authorName , 
    publishedDate, 
    title ,
    content 
} : blogVariables)  =>{

  
    return(
        <>
        
        <div className="border-b-2 border-slate-200 p-4">
          
                <div className="flex items-center">
                    <Avatar name = {authorName} ></Avatar>
                    <div className="pl-2 text-l font-thin">{authorName}</div>
                    <div className="rounded-full bg-slate-400 h-1 w-1 ml-2 flex items-center"></div>
                    <div className = "pl-1 font-thin text-l ">{publishedDate}</div>
                </div>

                <div className="text-2xl font-semibold">
                    {title}
                </div>

                <div className="mt-1 text-xl font-thin">
                    {content.slice(0 ,100) + "..."}
                </div>

                <div className="mt-4">
                    {`${Math.ceil(content.length / 100 )} minutes read`}
                </div>
           

        
        </div>

        </>
    )
}

function removeSpaces(str:string) {
    // Use regex to replace all whitespace characters with empty string
    return str.replace(/\s/g, '');
}

export function Avatar ({name } : {name : string }) {
   const initial :string =  removeSpaces(name);
   
    return(
        
        <>
        <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-md text-gray-600 dark:text-gray-300">{initial[0]}</span>
        </div>
        </>
    )
}