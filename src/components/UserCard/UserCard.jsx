import "./UserCard.css"

export const UserCard = ({ id, name, email }) => {

    return (
        <div className="userCardDesign">
            <div>{id}</div>
            <div>{name}</div>
            <div>{email}</div>
        </div>
    )
}