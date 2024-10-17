export const handleSignOut = () => {
    // Clear token from localStorage
    window.localStorage.removeItem('token');
    // Reload the page to reflect sign-out state
    window.location.reload();
  };
  