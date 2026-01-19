import {useState} from "react";
import {apiRequest} from "../../services/api";
import {useNavigate} from "react-router-dom";

function CreateRepo() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        try{
            await apiRequest("/repo/create", {
                method:"POST",
                body: {
                    name,
                    description,
                    isPrivate,
                    owner: userId
                }
            });

            navigate("/dashboard");
        } catch(err) {
            setError(err.message);
        }
    };

    return (
        <div className="create-new-repo" >
            <h2>Create a new Repository</h2>
            <br></br>

            <p style={{color:"#646464ff"}}>Repositories contain a project's files and version history.</p>
             <p style={{color:"#646464ff",fontStyle:"italic"}}>Required fields are marked with an asterisk (*).</p>
            
            <br></br>
            {error && <p style={{color: "red"}}>{error}</p>}
            
            <form onSubmit = {handleSubmit}>
                <div>
                    <p>Repository name *</p>
                    <input
                        type="text"
                        
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <p>Description <i>(Optional)</i></p>
                    <input
                        type="text"
                        
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <select
                        value={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.value === "true")}
                    >
                        <option value="false">Public</option>
                        <option value="true">Private</option>
                    </select>
                    </div>

                <br></br>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateRepo;