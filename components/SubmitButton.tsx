import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
}

const SubmitButton = ({ isLoading, children, className }: Props) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <>
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
