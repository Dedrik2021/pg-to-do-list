const ListHeader = ({listName, setOpenModal, setMode, removeCookie}) => {
    
    const signOut = () => {
        console.log('sign out');
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }

    const className = 'create'
    const handleOpenModal = () => {
        setMode(className)
        setOpenModal(true)
    }


    return ( 
        <div className="list-header">
            <h1>{listName}</h1>
            <div className="button-container">
                <button type="button" className={className} onClick={handleOpenModal}>ADD NEW</button>
                <button type="button" onClick={signOut} className="signout">SIGNOUT</button>
            </div>
        </div>
    );
}

export default ListHeader;