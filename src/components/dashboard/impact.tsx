import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Impact(props: any) {
  return (
    <div className="py-1 flex gap-2 justify-between">
      <div className="bg-green-100/40 rounded-md text-center text-[#4C9B75] p-4">
        <h2>Dampak Positif</h2>
        <div className="flex items-center justify-center gap-1 text-center text-xl font-bold text-green">
          <p>😄</p>
          <p>{props.positive}</p>
        </div>
      </div>
      <div className="bg-red-100/40 rounded-md text-center text-[#FF6171] p-4">
        <h2>Dampak Negatif</h2>
        <div className="flex items-center justify-center gap-1 text-center text-xl font-bold text-green">
          <p>🙁</p>
          <p>{props.negative}</p>
        </div>
      </div>
    </div>
  );
}
