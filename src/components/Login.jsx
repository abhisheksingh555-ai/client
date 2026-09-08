import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    // ----------------------------------------
    // Validation
    // ----------------------------------------
    const validateField = (name, value) => {
        switch (name) {
            case "email":
                if (!value.trim()) {
                    return "Email address is required";
                }

                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        value.trim()
                    )
                ) {
                    return "Please enter a valid email address";
                }

                return "";

            case "password":
                if (!value) {
                    return "Password is required";
                }

                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }

                return "";

            default:
                return "";
        }
    };

    const emailError = validateField(
        "email",
        formData.email
    );

    const passwordError = validateField(
        "password",
        formData.password
    );

    const emailValid =
        touched.email &&
        formData.email &&
        !emailError;

    const passwordValid =
        touched.password &&
        formData.password &&
        !passwordError;

    // ----------------------------------------
    // Input change
    // ----------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    // ----------------------------------------
    // Input blur
    // ----------------------------------------
    const handleBlur = (e) => {
        const { name } = e.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    // ----------------------------------------
    // Input style
    // ----------------------------------------
    const getInputClass = (name) => {
        const error =
            touched[name] &&
            validateField(name, formData[name]);

        const valid =
            touched[name] &&
            formData[name] &&
            !error;

        if (error) {
            return `
                border-red-500
                bg-red-50
                focus:border-red-500
                focus:ring-4
                focus:ring-red-100
            `;
        }

        if (valid) {
            return `
                border-green-500
                bg-green-50/30
                focus:border-green-500
                focus:ring-4
                focus:ring-green-100
            `;
        }

        return `
            border-gray-300
            bg-white
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
        `;
    };

    // ----------------------------------------
    // Login
    // ----------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({
            email: true,
            password: true,
        });

        const currentEmailError = validateField(
            "email",
            formData.email
        );

        const currentPasswordError = validateField(
            "password",
            formData.password
        );

        if (
            currentEmailError ||
            currentPasswordError
        ) {
            toast.error(
                "Please fix the highlighted fields."
            );
            return;
        }

        try {
            await login({
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            }).unwrap();

            toast.success("Login successful!");

            // Clear sensitive password data
            setFormData({
                email: "",
                password: "",
            });

            setTouched({
                email: false,
                password: false,
            });

            // Small delay so user sees success toast
            setTimeout(() => {
                navigate("/dashboard");
            }, 700);

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            toast.error(
                error?.message ||
                    "Unable to login. Please try again."
            );
        }
    };

    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 px-4 py-6 sm:px-6">

                <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center">

                    <div className="w-full max-w-md">

                        {/* Login Card */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-8">

                            {/* Logo */}
                            <div className="flex justify-center">

                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-blue-600
                                        text-2xl
                                        font-bold
                                        text-white
                                        shadow-lg
                                        sm:h-16
                                        sm:w-16
                                        sm:text-3xl
                                    "
                                >
                                    R
                                </div>

                            </div>

                            {/* Heading */}
                            <div className="mt-5 text-center">

                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    Welcome Back
                                </h1>

                                <p className="mt-2 text-sm text-gray-500 sm:text-base">
                                    Sign in to continue to your account
                                </p>

                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className="mt-7 space-y-5"
                            >

                                {/* Email */}
                                <div>

                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <div className="relative">

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            disabled={loading}
                                            className={`
                                                w-full
                                                rounded-xl
                                                border
                                                px-4
                                                py-3.5
                                                pr-11
                                                text-sm
                                                text-gray-900
                                                outline-none
                                                transition-all
                                                duration-200
                                                placeholder:text-gray-400
                                                disabled:cursor-not-allowed
                                                disabled:bg-gray-50
                                                ${getInputClass("email")}
                                            `}
                                        />

                                        {/* Valid icon */}
                                        {emailValid && (
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-green-600">
                                                ✓
                                            </span>
                                        )}

                                        {/* Error icon */}
                                        {touched.email &&
                                            emailError && (
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-red-500">
                                                    !
                                                </span>
                                            )}

                                    </div>

                                    {/* Error */}
                                    {touched.email &&
                                        emailError && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {emailError}
                                            </p>
                                        )}

                                </div>

                                {/* Password */}
                                <div>

                                    <label
                                        htmlFor="password"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <div className="relative">

                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                formData.password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            onBlur={
                                                handleBlur
                                            }
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            disabled={loading}
                                            className={`
                                                w-full
                                                rounded-xl
                                                border
                                                px-4
                                                py-3.5
                                                pr-20
                                                text-sm
                                                text-gray-900
                                                outline-none
                                                transition-all
                                                duration-200
                                                placeholder:text-gray-400
                                                disabled:cursor-not-allowed
                                                disabled:bg-gray-50
                                                ${getInputClass(
                                                    "password"
                                                )}
                                            `}
                                        />

                                        {/* Password valid icon */}
                                        {passwordValid && (
                                            <span className="absolute right-12 top-1/2 -translate-y-1/2 text-lg font-bold text-green-600">
                                                ✓
                                            </span>
                                        )}

                                        {/* Password error */}
                                        {touched.password &&
                                            passwordError && (
                                                <span className="absolute right-12 top-1/2 -translate-y-1/2 text-lg font-bold text-red-500">
                                                    !
                                                </span>
                                            )}

                                        {/* Eye button */}
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            className="
                                                absolute
                                                right-3
                                                top-1/2
                                                -translate-y-1/2
                                                rounded-md
                                                p-1
                                                text-gray-500
                                                transition
                                                hover:bg-gray-100
                                                hover:text-gray-800
                                                disabled:cursor-not-allowed
                                            "
                                        >
                                            {showPassword
                                                ? "🙈"
                                                : "👁️"}
                                        </button>

                                    </div>

                                    {/* Error */}
                                    {touched.password &&
                                        passwordError && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {passwordError}
                                            </p>
                                        )}

                                </div>

                                {/* Login button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-blue-600
                                        py-3.5
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-sm
                                        transition-all
                                        duration-200
                                        hover:bg-blue-700
                                        hover:shadow-md
                                        focus:outline-none
                                        focus:ring-4
                                        focus:ring-blue-200
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="
                                                    mr-2
                                                    h-5
                                                    w-5
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-white
                                                    border-t-transparent
                                                "
                                            />

                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>

                            </form>

                            {/* Register */}
                            <div className="mt-7 border-t border-gray-100 pt-6 text-center">

                                <p className="text-sm text-gray-600">

                                    Don't have an account?{" "}

                                    <Link
                                        to="/register"
                                        className="
                                            font-semibold
                                            text-blue-600
                                            transition
                                            hover:text-blue-700
                                            hover:underline
                                        "
                                    >
                                        Create account
                                    </Link>

                                </p>

                            </div>

                        </section>

                    </div>

                </div>

            </main>

            {/* Toast */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Login;

