package sfeir.devs.samples.greeting;

public class Greeting {
	private final String greeting;

	private Greeting(final String greeting) {
		super();
		this.greeting = greeting;
	}

	public String getGreeting() {
		return greeting;
	}

	public static Greeting fromString(final String message) {
		return new Greeting(message);
	}
}