import { useEffect, useRef, ChangeEvent } from "react";

interface TextAreaAutosizeProps {
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	autofocus: boolean;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextAreaAutosize: React.FC<TextAreaAutosizeProps> = ({
	value,
	onChange,
	className,
	autofocus,
	onKeyDown,
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
			textareaRef.current.style.width = "60vh";
			textareaRef.current.style.width = `${textareaRef.current.scrollWidth}px`;
		}
	}, [value]);

	return (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={onChange}
			className={className}
			autoFocus={autofocus}
			onKeyDown={onKeyDown}
		/>
	);
};

export default TextAreaAutosize;
