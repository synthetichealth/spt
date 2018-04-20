import java.util.ArrayList;
import java.util.List;

import org.mitre.synthea.world.agents.Person;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
public class App {
    
	@GetMapping("/patients")
	@ResponseBody
	public List<Person> getPatients() {
		List<Person> patients = new ArrayList<>();
		
		for (int i = 0 ; i < 5 ; i++) {
			patients.add(getPatient(i));
		}
		
		return patients;
	}
	
	
	@GetMapping("/patients/{patientId}")
	@ResponseBody
	public Person getPatient(@PathVariable long patientId) {
		return new Person(patientId);
	}

    public static void main(String[] args) throws Exception {
        SpringApplication.run(App.class, args);
    }
}