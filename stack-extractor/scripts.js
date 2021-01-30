const textarea = document.getElementById('log-text');

textarea.addEventListener('input', e => {
  let stackTrace;

  try {
    const logText = e.target.value;
    const rawJson = logText.split(/({.+)/)[1];
    const json = JSON.parse(rawJson);

    if (json.hasOwnProperty('StackTrace')) {
      stackTrace = json['StackTrace'];
    } else if (json.hasOwnProperty('stack_trace')) {
      stackTrace = json['stack_trace'];
    } else {
      throw new Error("JSON parsed but no 'StackTrace' or 'stack_trace' property found");
    }
  } catch (error) {
    stackTrace = "Failed to parse log:\n" + error.message;
  }

  document.getElementById('stack-trace').textContent = stackTrace;
});

const exampleLog = `Example text | thread-4 | {"timestamp":"2019-11-19 15:42:35.891","level":"ERROR","mdc":{"appVersion":null,"appType":null,"User-Agent":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0","ipAddress":"127.0.0.1","member":"1","BuildVersion":null,"queryString":"id=736145632145","uri":"/register/needDetail","HostName":"urbanpro-Vostro-3583"},"logger":"org.grails.web.errors.GrailsExceptionResolver","stack_trace":"Exception in thread \\"main\\"\\njava.lang.NullPointerException\\n        at com.example.myproject.Book.getTitle(Book.java:16)\\n        at com.example.myproject.Author.getBookTitles(Author.java:25)\\n        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)"}`

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleLog;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
