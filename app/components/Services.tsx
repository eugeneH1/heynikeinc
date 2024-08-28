'use client'
import { CardHeader, CardContent, Card } from "@/components/ui/card"

export default function ServicesComponent() {
  return (
    <section className="w-full py-2 md:py-4 lg:py-6">
      <div className="container px-4 md:px-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
          Heynike Inc is a relatively small firm focused primarily on Property Law.
          </h2>
          <p className="max-w-[800px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          We provide a range of services, to accommodate matters that might result from a property transaction. Such as estate management, wills and litigation. Heynike Inc has a long history, with an excellent track record in, property law, family law and commercial litigation.
          </p>
        </div>
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">General Mercentile Law</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              General mercantile law covers the legal rules for business transactions, including contracts, sales, and company regulations, ensuring fair and lawful trade practices.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">Company Law</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              Company law governs the formation, operation, and dissolution of companies, ensuring compliance with legal standards and protecting the rights of shareholders and stakeholders.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">Contract Law</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              Contract law regulates agreements between parties, ensuring they are legally binding and enforceable, based on mutual consent, legality, and the fulfillment of obligations.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">Conveyancing</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              Conveyancing is the legal process of transferring property ownership from one person to another, involving the preparation, execution, and registration of deeds to ensure a valid and secure transfer.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">General Contracts</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              Our firm specializes in drafting, reviewing, and enforcing contracts, ensuring your agreements are clear, legally sound, and protect your interests in every business or personal transaction.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">Anti Nuptual Contracts</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              We expertly draft anti-nuptial contracts to protect your assets and define financial arrangements before marriage, ensuring clarity and security for your future.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">Drafting of sale agreements</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              Our firm provides precise and comprehensive sale agreements, ensuring all terms are clear, legally binding, and tailored to protect your interests in any transaction.
              </p>
            </CardContent>
          </Card>
          <Card className="lg:transform lg:hover:scale-105 lg:transition-transform lg:duration-200">
            <CardHeader>
              <h3 className="text-xl font-bold">Transfers, Bonds and related matters</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
              Our firm handles property transfers, bond registrations, and all related legal matters with precision and efficiency, ensuring a smooth and secure process for every client.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}