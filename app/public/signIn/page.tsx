import SignInForm from "@/components/signIn/signIn-form";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <main className="w-full max-w-sm">
        <SignInForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">       
      </footer>
    </div>
  );
}
