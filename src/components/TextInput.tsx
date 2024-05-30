import {
    ForwardedRef,
    InputHTMLAttributes,
    ReactNode,
    forwardRef,
} from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    leadingIcon?: ReactNode;
}

const TextInput = forwardRef(
    (
        { error, leadingIcon, ...props }: TextInputProps,
        ref: ForwardedRef<HTMLInputElement>,
    ) => {
        const borderClassName = "input input-bordered flex items-center gap-2";

        const errorBorderClassName =
            "input input-bordered input-error flex items-center gap-2";

        return (
            <label className="form-control w-full">
                <div className={error ? errorBorderClassName : borderClassName}>
                    {!!leadingIcon && leadingIcon}

                    <input {...{ ref, ...props }} className="grow" />
                </div>

                {error && (
                    <div className="label">
                        <span className="label-text-alt text-error">
                            {error}
                        </span>
                    </div>
                )}
            </label>
        );
    },
);

export default TextInput;
