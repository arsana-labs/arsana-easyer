import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            ERDiagram
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:underline">
              Documentation
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Create professional ER diagrams with ease
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Design, edit, and export entity relationship diagrams using Chen, Crow's Foot, or UML notations with our
              intuitive drag-and-drop interface.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Try the demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="ER Diagram Editor Interface"
                className="rounded-lg border shadow-lg"
                width={1200}
                height={600}
              />
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Supported Notations</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Create diagrams using any of the popular ER diagram notations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <h3 className="text-xl font-bold">Chen Notation</h3>
                <p className="mt-2 text-muted-foreground">
                  The original ER notation with rectangles for entities and diamonds for relationships
                </p>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Chen Notation Example"
                  className="mt-4 rounded"
                  width={300}
                  height={200}
                />
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <h3 className="text-xl font-bold">Crow's Foot Notation</h3>
                <p className="mt-2 text-muted-foreground">
                  Popular in database modeling with distinctive "crow's foot" connectors for cardinality
                </p>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Crow's Foot Notation Example"
                  className="mt-4 rounded"
                  width={300}
                  height={200}
                />
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <h3 className="text-xl font-bold">UML Notation</h3>
                <p className="mt-2 text-muted-foreground">
                  Unified Modeling Language style with class diagrams for entities and relationships
                </p>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="UML Notation Example"
                  className="mt-4 rounded"
                  width={300}
                  height={200}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            ERDiagram
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">© 2025 ERDiagram. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

