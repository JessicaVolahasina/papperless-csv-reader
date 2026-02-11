import {useState} from "react";

function App() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");


    function handleFile(event) {
        const file = event.target.files[0];
        if(!file) return;

        const reader = new FileReader();
        reader.onload= function(e){
            const text = e.target.result;
            const lines= text.split("\n");

            const result=[];

            for(let i=0; i<lines.length; i++){
                const row= lines[i].split(",");
                result.push(row);
            }
            setData(result);
        };
        reader.readAsText(file);

    }

    return (
        <div className="container"> 
            <h2>CSV Reader</h2>

            <input type="file" accept=".csv" onChange={handleFile} />
            <p>Nombres de lignes: {data.length}</p>
            <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <p>
                Lignes affichées :
                {
                    data.filter(row =>
                    row.join(" ").toLowerCase().includes(search.toLowerCase())
                    ).length
                }
            </p>




            <table border="1" cellPadding="5" >
                <tbody>
                    {data
                        .filter(row =>
                            row.join(" ").toLowerCase().includes(search.toLowerCase())
                        )
                        .map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j)=>(
                                <td key={j}>{cell}</td>
                            ))}

                        </tr>
                    
                    ))}
                </tbody>
            </table>

        </div>
    )

}
export default App;