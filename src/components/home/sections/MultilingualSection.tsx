import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";

const MultilingualSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Speak Your Language, Learn Better
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            A1Score works in all major Nigerian languages so everyone can learn in the way that feels most natural.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {[
            {
              name: "English",
              flag: "🇬🇧",
              speakers: "Official Language",
              color: "bg-blue-500"
            },
            {
              name: "Yoruba",
              flag: "🟡",
              speakers: "Southwest Nigeria",
              color: "bg-yellow-500"
            },
            {
              name: "Hausa",
              flag: "🟢",
              speakers: "Northern Nigeria",
              color: "bg-green-500"
            },
            {
              name: "Igbo",
              flag: "🔴",
              speakers: "Southeast Nigeria",
              color: "bg-red-500"
            },
            {
              name: "Pidgin",
              flag: "🌍",
              speakers: "All Over Nigeria",
              color: "bg-purple-500"
            }
          ].map((language, index) => (
            <Card key={index} className="border border-gray-200 border-l-4 border-l-indigo-500 md:hover:border-indigo-300 transition-colors duration-200 motion-reduce:transition-none min-h-[120px] text-center">
              <CardHeader className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">{language.flag}</div>
                <CardTitle className="text-base md:text-lg leading-tight">{language.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <p className="text-gray-600 text-sm md:text-base mb-2 sm:mb-3 leading-relaxed">{language.speakers}</p>
                <Badge className="bg-gray-100 text-gray-800 text-xs">Available Now</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MultilingualSection;
