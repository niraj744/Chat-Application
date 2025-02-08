"use client";

const User = () => {
  const items = ["1", "2", "3", "4"];
  return (
    <>
      {items.map((item) => (
        <div
          key={item}
          className="animated flex gap-3 items-center capitalize cursor-pointer p-1 rounded-md"
        >
          <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-secondary/20" />
          <span className="bg-secondary/20 flex-1 h-3 rounded-md" />
        </div>
      ))}
    </>
  );
};

export default User;
