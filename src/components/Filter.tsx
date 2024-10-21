interface props {
  onChangeSelected: (selectedBackground: string) => void;
  backgroundOptions: string[];
  onChangePrompt : (prompt:string) => void;
}
export const Filter: React.FC<props> = ({
  onChangeSelected,
  backgroundOptions,
  onChangePrompt

}) => {
  return (
    <div className="lg:max-w-xs mx-auto max-w-sm">
      <p className="text-pretty">You can choose one background  or write a custom prompt </p>
      <select
        className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        onChange={(e) => onChangeSelected(e.target.value)}
      >
        <option value="">Open this select menu</option>
        {backgroundOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <p className="text-center">-</p>
      <textarea
        className="mb-5 py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm  disabled:pointer-events-none bg-neutral-900  text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
        placeholder="write your prompt here"
        onChange={(e) => onChangePrompt(e.target.value)}
      />
    </div>
  );
};
