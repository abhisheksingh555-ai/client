import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getMe } from "./features/auth/authThunks";
import { resetAuth } from "./features/auth/authSlice";
import { ACCESS_TOKEN_KEY } from "./utils/constants";
import { storage } from "./utils/storage";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (storage.get(ACCESS_TOKEN_KEY)) {
            dispatch(getMe());
        } else {
            dispatch(resetAuth());
        }
    }, [dispatch]);

    return <AppRoutes />;
}

export default App;