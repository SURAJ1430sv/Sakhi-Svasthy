import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";

export default function ResearchCharts() {
  const { language } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="bg-neutral-50 p-6 rounded-lg shadow-sm">
        <h3 className="font-heading text-xl font-semibold mb-4">Awareness Levels</h3>
        <div className="h-64 flex items-center justify-center bg-white rounded mb-4">
          <div className="w-full h-full p-4">
            <div className="relative h-full">
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                <div className="w-1/4 mx-1 bg-primary h-[35%] rounded-t-md relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm">35%</span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">PCOS</span>
                </div>
                <div className="w-1/4 mx-1 bg-secondary h-[28%] rounded-t-md relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm">28%</span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">PCOD</span>
                </div>
                <div className="w-1/4 mx-1 bg-accent h-[60%] rounded-t-md relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm">60%</span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">Breast Cancer</span>
                </div>
                <div className="w-1/4 mx-1 bg-neutral-400 h-[42%] rounded-t-md relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm">42%</span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">Overall</span>
                </div>
              </div>
              <div className="absolute left-0 bottom-0 w-full h-[1px] bg-neutral-300"></div>
            </div>
          </div>
        </div>
        <p className="text-neutral-600">Our study found that while 60% of college students were aware of breast cancer, only 35% knew about PCOS and 28% about PCOD, highlighting the need for increased education.</p>
      </div>
      
      <div className="bg-neutral-50 p-6 rounded-lg shadow-sm">
        <h3 className="font-heading text-xl font-semibold mb-4">Knowledge by Education Level</h3>
        <div className="h-64 flex items-center justify-center bg-white rounded mb-4">
          <div className="w-full h-full p-4">
            <div className="relative h-full">
              <div className="absolute left-0 top-0 h-full border-l border-neutral-300 flex flex-col justify-between text-xs text-neutral-500 py-2">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              <div className="absolute bottom-0 left-10 right-0 h-full flex items-end justify-around">
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gradient-to-t from-primary to-secondary h-[30%] rounded-t-md"></div>
                  <span className="mt-2 text-xs">UG Year 1</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gradient-to-t from-primary to-secondary h-[45%] rounded-t-md"></div>
                  <span className="mt-2 text-xs">UG Year 2</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gradient-to-t from-primary to-secondary h-[52%] rounded-t-md"></div>
                  <span className="mt-2 text-xs">UG Year 3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gradient-to-t from-primary to-secondary h-[68%] rounded-t-md"></div>
                  <span className="mt-2 text-xs">PG Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-neutral-600">Awareness levels increase significantly with education level, with postgraduate students showing 68% awareness compared to 30% in first-year undergraduates.</p>
      </div>
    </div>
  );
}
