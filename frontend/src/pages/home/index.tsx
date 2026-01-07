import { useTranslation } from "react-i18next";

export default function Home() {

  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{t("welcome_message")}</h1>
      <p className="text-muted-foreground">
        Manage your inventory, products, and generate reports all in one place.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Products</h3>
          <p className="text-sm text-muted-foreground">
            Manage your product catalog and details.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Inventory</h3>
          <p className="text-sm text-muted-foreground">
            Track stock levels and movements.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate insights from your data.
          </p>
        </div>
      </div>
    </div>
  )
}
