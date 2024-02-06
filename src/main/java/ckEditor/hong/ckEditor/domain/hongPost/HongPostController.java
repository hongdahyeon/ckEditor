package ckEditor.hong.ckEditor.domain.hongPost;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/post")
@RequiredArgsConstructor
public class HongPostController {

    private final HongPostService service;

    @GetMapping("/list")
    public String list(Model model) {
        model.addAttribute("list", service.list());
        return "/post/index";
    }

    @GetMapping("/new")
    public String save() {
        return "/post/new";
    }

    @GetMapping("/view/{id}")
    public String view(@PathVariable(name = "id") Long id, Model model) {
        model.addAttribute("post", service.view(id));
        return "/post/view";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable(name = "id") Long id, Model model) {
        model.addAttribute("post", service.view(id));
        return "/post/edit";
    }
}