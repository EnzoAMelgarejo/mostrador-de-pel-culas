import { useState } from "react";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ProfileLists from "../components/profileLists";
import "../styles/profile.css";
import "../styles/loading.css"

const Profile = () => {
  const {user, loading, logout} = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <p>No se encontró la información del usuario</p>;
  }

  const defaultProfilePicture = "https://img.icons8.com/ios/150/000000/user.png";
  const defaultBio = "Aún no has agregado una biografía.";

  const profilePicture = user.profilePicture || defaultProfilePicture;
  const bio = user.bio || defaultBio;

  return (
    <div className="profile-container">
      {/* Sección de acciones (botones superiores) */}
      <div className="profile-actions">
        <button className="edit-profile-btn">
          <FontAwesomeIcon icon={faEdit} />
        </button>

        {/* Botón de configuración con menú desplegable */}
        <div className="settings-menu">
          <button className="profile-btn" onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon icon={faCog} />
          </button>

          {showMenu && (
            <div className="dropdown-menu">
              <button className="logout-btn" onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sección de perfil */}
      <div className="profile-header">
        {/* Foto de perfil */}
        <img src={profilePicture} alt="Foto de perfil" className="profile-pic" />

        {/* Información del usuario */}
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>Edad: {user.age}</p>
          <p>Username: @{user.userName}</p>
          <p>Email: {user.email}</p>
          <p>Biografía: {bio}</p>
        </div>
      </div>

      {/* Sección de listas */}
      <div className="lists-section">
          <ProfileLists userId={user._id}/>
      </div>
    </div>
  );
};

export default Profile;
