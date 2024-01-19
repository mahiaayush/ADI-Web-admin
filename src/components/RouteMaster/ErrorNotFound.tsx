import { Fragment } from "react";

const ErrorNotFound = () => {
    return <div className="error404">
             <div className="error404in globalPattern">
                <>
                    <h1>404
                    <span>PAGE NOT FOUND</span></h1>
                    <h2>Oops!</h2>
                    <p>We’re sorry, we can’t find the page you’re looking for. It might have been removed or renamed, or it might be temporarily unavailable.</p>
                </>
            </div>
      </div>
  }

export default ErrorNotFound;