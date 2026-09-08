import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
    });

    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // ----------------------------------------
    // Validation
    // ----------------------------------------
    const validateField = (name, value) => {
        const trimmedValue = value.trim();

        switch (name) {
            case "firstName":
                if (!trimmedValue) {
                    return "First name is required";
                }

                if (trimmedValue.length < 2) {
                    return "First name must be at least 2 characters";
                }

                if (!/^[A-Za-z\s'-]+$/.test(trimmedValue)) {
                    return "First name contains invalid characters";
                }

                return "";

            case "lastName":
                if (!trimmedValue) {
                    return "Last name is required";
                }

                if (trimmedValue.length < 2) {
                    return "Last name must be at least 2 characters";
                }

                if (!/^[A-Za-z\s'-]+$/.test(trimmedValue)) {
                    return "Last name contains invalid characters";
                }

                return "";

            case "email":
                if (!trimmedValue) {
                    return "Email is required";
                }

                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        trimmedValue
                    )
                ) {
                    return "Enter a valid email address";
                }

                return "";

            case "phone":
                if (!trimmedValue) {
                    return "Phone number is required";
                }

                if (!/^[0-9+\-\s()]{10,20}$/.test(trimmedValue)) {
                    return "Enter a valid phone number";
                }

                return "";

            case "username":
                if (!trimmedValue) {
                    return "Username is required";
                }

                if (trimmedValue.length < 3) {
                    return "Username must be at least 3 characters";
                }

                if (trimmedValue.length > 30) {
                    return "Username cannot exceed 30 characters";
                }

                if (!/^[a-zA-Z0-9_]+$/.test(trimmedValue)) {
                    return "Only letters, numbers and _ are allowed";
                }

                return "";

            case "password":
                if (!value) {
                    return "Password is required";
                }

                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                    return "Add at least one uppercase letter";
                }

                if (!/[a-z]/.test(value)) {
                    return "Add at least one lowercase letter";
                }

                if (!/[0-9]/.test(value)) {
                    return "Add at least one number";
                }

                return "";

            default:
                return "";
        }
    };

    const getFieldError = (name) => {
        return validateField(name, formData[name]);
    };

    const isFieldValid = (name) => {
        return (
            touched[name] &&
            formData[name] &&
            !getFieldError(name)
        );
    };

    // ----------------------------------------
    // Handle Change
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
    // Handle Blur
    // ----------------------------------------
    const handleBlur = (e) => {
        const { name } = e.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    // ----------------------------------------
    // Input Styling
    // ----------------------------------------
    const getInputClass = (name) => {
        const error =
            touched[name] && getFieldError(name);

        const valid = isFieldValid(name);

        if (error) {
            return `
                border-red-500
                bg-red-50/40
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
    // Submit
    // ----------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const fields = Object.keys(formData);

        const newTouched = {};

        fields.forEach((field) => {
            newTouched[field] = true;
        });

        setTouched(newTouched);

        const hasErrors = fields.some(
            (field) =>
                validateField(field, formData[field])
        );

        if (hasErrors) {
            toast.error(
                "Please fix the highlighted fields."
            );
            return;
        }

        try {
            await register({
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim(),
                username: formData.username.trim(),
                password: formData.password,
            }).unwrap();

            toast.success(
                "Account created successfully!"
            );

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                username: "",
                password: "",
            });

            setTouched({});

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(
                "REGISTRATION ERROR:",
                error
            );

            toast.error(
                error?.message ||
                    "Something went wrong. Please try again."
            );
        }
    };

    // ----------------------------------------
    // Reusable Input
    // ----------------------------------------
    const renderInput = ({
        name,
        label,
        type = "text",
        placeholder,
        autoComplete,
    }) => {
        const error =
            touched[name] && getFieldError(name);

        const valid = isFieldValid(name);

        return (
            <div className="w-full">

                <label
                    htmlFor={name}
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    {label}

                    <span className="ml-1 text-red-500">
                        *
                    </span>
                </label>

                <div className="relative">

                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={formData[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        disabled={loading}
                        className={`
                            w-full
                            rounded-xl
                            border
                            px-4
                            py-3.5
                            text-sm
                            text-gray-900
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-gray-400
                            disabled:cursor-not-allowed
                            disabled:bg-gray-50
                            ${
                                valid || error
                                    ? "pr-11"
                                    : ""
                            }
                            ${getInputClass(name)}
                        `}
                    />

                    {valid && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-green-600">
                            ✓
                        </span>
                    )}

                    {error && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-red-500">
                            !
                        </span>
                    )}

                </div>

                {error && (
                    <p className="mt-1.5 text-xs text-red-600">
                        {error}
                    </p>
                )}

            </div>
        );
    };

    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 px-3 py-5 sm:px-6 sm:py-8">

                <div className="flex min-h-[calc(100vh-2.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]">

                    <div className="w-full max-w-2xl">

                        {/* Card */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:p-6 md:p-8">

                            {/* Header */}
                            <div className="mb-7 text-center sm:mb-8">

                                <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg sm:h-15 sm:w-15 sm:text-2xl">
                                    R
                                </div>

                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    Create Account
                                </h1>

                                <p className="mt-2 px-2 text-sm text-gray-500 sm:text-base">
                                    Create your account to get started
                                </p>

                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className="space-y-4"
                            >

                                {/* Name */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    {renderInput({
                                        name: "firstName",
                                        label: "First Name",
                                        placeholder: "John",
                                        autoComplete:
                                            "given-name",
                                    })}

                                    {renderInput({
                                        name: "lastName",
                                        label: "Last Name",
                                        placeholder: "Doe",
                                        autoComplete:
                                            "family-name",
                                    })}

                                </div>

                                {/* Email */}
                                {renderInput({
                                    name: "email",
                                    label: "Email Address",
                                    type: "email",
                                    placeholder:
                                        "john@example.com",
                                    autoComplete:
                                        "email",
                                })}

                                {/* Phone */}
                                {renderInput({
                                    name: "phone",
                                    label: "Phone Number",
                                    type: "tel",
                                    placeholder:
                                        "+91 9876543210",
                                    autoComplete:
                                        "tel",
                                })}

                                {/* Username */}
                                {renderInput({
                                    name: "username",
                                    label: "Username",
                                    placeholder:
                                        "john_doe",
                                    autoComplete:
                                        "username",
                                })}

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
                                            placeholder="Create a strong password"
                                            autoComplete="new-password"
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

                                        {/* Valid */}
                                        {isFieldValid(
                                            "password"
                                        ) && (
                                            <span className="absolute right-12 top-1/2 -translate-y-1/2 text-lg font-bold text-green-600">
                                                ✓
                                            </span>
                                        )}

                                        {/* Show password */}
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword
                                                ? "🙈"
                                                : "👁️"}
                                        </button>

                                    </div>

                                    {/* Password Rules */}
                                    {formData.password && (
                                        <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">

                                            <p className="mb-3 text-xs font-semibold text-gray-600">
                                                Password requirements
                                            </p>

                                            <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">

                                                <PasswordRule
                                                    valid={
                                                        formData
                                                            .password
                                                            .length >=
                                                        8
                                                    }
                                                    text="At least 8 characters"
                                                />

                                                <PasswordRule
                                                    valid={
                                                        /[A-Z]/.test(
                                                            formData.password
                                                        )
                                                    }
                                                    text="One uppercase letter"
                                                />

                                                <PasswordRule
                                                    valid={
                                                        /[a-z]/.test(
                                                            formData.password
                                                        )
                                                    }
                                                    text="One lowercase letter"
                                                />

                                                <PasswordRule
                                                    valid={
                                                        /[0-9]/.test(
                                                            formData.password
                                                        )
                                                    }
                                                    text="One number"
                                                />

                                            </div>

                                        </div>
                                    )}

                                    {touched.password &&
                                        getFieldError(
                                            "password"
                                        ) && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {getFieldError(
                                                    "password"
                                                )}
                                            </p>
                                        )}

                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        mt-2
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
                                            <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                                            Creating account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>

                            </form>

                            {/* Login */}
                            <div className="mt-6 border-t border-gray-100 pt-5 text-center sm:mt-7 sm:pt-6">

                                <p className="text-sm text-gray-600">

                                    Already have an account?{" "}

                                    <Link
                                        to="/login"
                                        className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                                    >
                                        Sign in
                                    </Link>

                                </p>

                            </div>

                        </section>

                    </div>

                </div>

            </main>

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

// ----------------------------------------
// Password Rule
// ----------------------------------------
const PasswordRule = ({ valid, text }) => {
    return (
        <div
            className={`
                flex
                items-center
                gap-2
                ${
                    valid
                        ? "text-green-600"
                        : "text-gray-400"
                }
            `}
        >
            <span className="font-bold">
                {valid ? "✓" : "○"}
            </span>

            <span>{text}</span>
        </div>
    );
};

export default Register;

