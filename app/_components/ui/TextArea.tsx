import cn from "@/app/utils/cn";

type TextAreaProps = {} & React.AllHTMLAttributes<HTMLTextAreaElement>;
export default function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        `px-3 py-2 w-full h-16 border border-border-grey border-opacity-0 rounded-sm transition-colors
        bg-primary-mild bg-opacity-20 font-light resize-none focus:outline-none focus:border-opacity-100`,
        className
      )}
    ></textarea>
  );
}
