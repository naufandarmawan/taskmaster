import {
  CheckCircle2,
  Circle,
  LoaderCircle,
  Pencil,
  XCircle,
} from "lucide-react";

const Card = ({ task, loading, onEdit, onDelete, onComplete }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleString("en-GB", options).replace(",", "");
  };
  return (
    <div className="flex justify-between items-center p-4 bg-[#D0D0D0] rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h3
            className={`font-normal text-base text-black ${
              task.completed && "line-through"
            }`}
          >
            {task.title}
          </h3>
          <Pencil
            size={16}
            stroke="#33363F"
            onClick={() => onEdit(task)}
            className="cursor-pointer"
          />
        </div>
        <p className="font-normal text-xs text-black">
          {formatDate(task.createdAt)}
        </p>
      </div>
      <div className="flex gap-2">
        {loading?.delete ? (
          <LoaderCircle
            size={24}
            stroke="#33363F"
            className="cursor-pointer animate-spin"
          />
        ) : (
          <XCircle
            size={24}
            stroke="#33363F"
            onClick={() => onDelete(task)}
            className="cursor-pointer"
          />
        )}

        {loading?.complete ? (
          <LoaderCircle
            size={24}
            stroke="#33363F"
            className="cursor-pointer animate-spin"
          />
        ) : task.completed ? (
          <CheckCircle2
            size={24}
            stroke="#33363F"
            onClick={() => onComplete(task)}
            className="cursor-pointer"
          />
        ) : (
          <Circle
            size={24}
            stroke="#000000"
            fill="#FFFFFF"
            onClick={() => onComplete(task)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Card;
