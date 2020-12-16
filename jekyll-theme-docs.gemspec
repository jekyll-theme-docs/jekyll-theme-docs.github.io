# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-docs"
  spec.version       = "0.0.2"
  spec.authors       = ["Natan Felles"]
  spec.email         = ["natanfelles@gmail.com"]

  spec.summary       = "Bootstrap theme to host documentation. SEO optimized, Google CSE, Formspree and Disqus comments."
  spec.homepage      = "https://github.com/jekyll-theme-docs/jekyll-theme-docs.github.io"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.4"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", ">= 12.3.3"
end
