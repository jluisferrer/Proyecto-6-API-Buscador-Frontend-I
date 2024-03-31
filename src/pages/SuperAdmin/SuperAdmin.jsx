import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuperAdmin.css";
import { UserCard } from "../../components/UserCard/UserCard";
import { DeleteUsers, GetUsers } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { Header } from "../../common/Header/Header";

export const SuperAdminPanel = () => {
    const [users, setUsers] = useState([])
    const datosUser = JSON.parse(localStorage.getItem("passport"))
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)

    useEffect(() => {
        if (users.length === 0) {
            const BringData = async () => {
                try {
                    const fetched = await GetUsers(tokenStorage)
                    setUsers(fetched.data)
                } catch (error) {
                    console.log(error)
                }
            }
            BringData()
        }

    }, [users])

    const DeleteUser = async (id) =>  {
        console.log({id})
        try{
        const fetched = await DeleteUsers (id, tokenStorage)
        console.log(fetched)
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error){
            console.log(error)
        }
    }
    return (
        <>
            <Header />
            <div className="superAdminDesign">
                {
                    users.length > 0
                        ? (<div className="superAdminDesign">
                            {users.map(
                                user => {
                                    return (
                                        <>
                                            <UserCard
                                                id={user.id}
                                                name={user.name}
                                                email={user.email}
                                            />
                                            <CButton className={"cButtonDesign"}
                                                title={"Borrar User"}
                                                functionEmit={() => DeleteUser(user.id)}
                                            />
                                        </>
                                    )
                                }
                            )
                            }
                        </div>) : (<div className="superAdminDesign">
                            <p>Cargando Usuarios</p>
                        </div>)
                }
            </div>
        </>
    )
}
