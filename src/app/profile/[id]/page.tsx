export default function signup({params} : any) {
    return (
        <div>
            <h1>Profile page</h1>
            <p>hello {params.id}</p>
        </div>
    );
}