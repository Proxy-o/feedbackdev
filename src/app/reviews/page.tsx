import { getCompanies } from "./actions/review";
import { ReviewForm } from "./components/review-form";

export default async function Page() {
  const companies = await getCompanies();

  return (
    <div className="container py-10">
      <ReviewForm companies={companies} />
    </div>
  );
}
